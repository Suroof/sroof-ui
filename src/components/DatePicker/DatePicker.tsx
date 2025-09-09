import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styles from './DatePicker.module.scss';

export type DateValue = Date | null;
export type RangeValue = [Date | null, Date | null];

export interface DatePickerProps {
  /** 当前选中的日期（受控） */
  value?: DateValue | RangeValue;
  /** 默认选中的日期（非受控） */
  defaultValue?: DateValue | RangeValue;
  /** 是否为范围选择模式 */
  mode?: 'date' | 'range';
  /** 日期格式 */
  format?: string;
  /** 占位符 */
  placeholder?: string | [string, string];
  /** 尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否显示今天按钮 */
  showToday?: boolean;
  /** 是否显示时间选择 */
  showTime?: boolean;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 下拉面板类名 */
  popupClassName?: string;
  /** 下拉面板样式 */
  popupStyle?: React.CSSProperties;
  /** 下拉面板的挂载节点 */
  getPopupContainer?: () => HTMLElement;
  /** 日期变化回调 */
  onChange?: (date: DateValue | RangeValue, dateString: string | [string, string]) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 获得焦点回调 */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  /** 失去焦点回调 */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  /** 清除回调 */
  onClear?: () => void;
}

const MONTHS = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
];

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  mode = 'date',
  format = 'YYYY-MM-DD',
  placeholder,
  size = 'middle',
  disabled = false,
  allowClear = true,
  showToday = true,
  showTime = false,
  minDate,
  maxDate,
  disabledDate,
  className,
  style,
  popupClassName,
  popupStyle,
  getPopupContainer,
  onChange,
  onOpenChange,
  onFocus,
  onBlur,
  onClear,
}) => {
  const isRange = mode === 'range';
  const [internalValue, setInternalValue] = useState<DateValue | RangeValue>(
    defaultValue || (isRange ? [null, null] : null)
  );
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const inputRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const finalValue = isControlled ? value : internalValue;

  // 格式化日期
  const formatDate = useCallback((date: Date | null, fmt = format): string => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return fmt
      .replace('YYYY', year.toString())
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('HH', hour.toString().padStart(2, '0'))
      .replace('mm', minute.toString().padStart(2, '0'))
      .replace('ss', second.toString().padStart(2, '0'));
  }, [format]);

  // 解析日期字符串
  const parseDate = useCallback((dateString: string): Date | null => {
    if (!dateString) return null;

    // 简单的日期解析，实际项目中可能需要更复杂的解析逻辑
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }, []);

  // 获取显示文本
  const getDisplayText = useCallback(() => {
    if (isRange) {
      const [start, end] = finalValue as RangeValue;
      const startText = formatDate(start);
      const endText = formatDate(end);

      if (Array.isArray(placeholder)) {
        return [startText || placeholder[0], endText || placeholder[1]];
      }

      return [startText || '开始日期', endText || '结束日期'];
    }

    const dateText = formatDate(finalValue as DateValue);
    return dateText || (placeholder as string) || '请选择日期';
  }, [finalValue, formatDate, placeholder, isRange]);

  // 更新值
  const updateValue = useCallback((newValue: DateValue | RangeValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (isRange) {
      const [start, end] = newValue as RangeValue;
      const startString = formatDate(start);
      const endString = formatDate(end);
      onChange?.(newValue, [startString, endString]);
    } else {
      const dateString = formatDate(newValue as DateValue);
      onChange?.(newValue, dateString);
    }
  }, [isControlled, onChange, formatDate, isRange]);

  // 检查日期是否禁用
  const isDateDisabled = useCallback((date: Date) => {
    if (disabledDate?.(date)) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }, [disabledDate, minDate, maxDate]);

  // 检查日期是否在范围内
  const isDateInRange = useCallback((date: Date) => {
    if (!isRange) return false;

    const [start, end] = finalValue as RangeValue;
    if (!start || !end) return false;

    return date >= start && date <= end;
  }, [isRange, finalValue]);

  // 检查日期是否在悬停范围内
  const isDateInHoverRange = useCallback((date: Date) => {
    if (!isRange || !hoverDate) return false;

    const [start] = finalValue as RangeValue;
    if (!start || selecting !== 'end') return false;

    const min = start < hoverDate ? start : hoverDate;
    const max = start > hoverDate ? start : hoverDate;

    return date >= min && date <= max;
  }, [isRange, hoverDate, finalValue, selecting]);

  // 选择日期
  const selectDate = useCallback((date: Date) => {
    if (isDateDisabled(date)) return;

    if (isRange) {
      const [start, end] = finalValue as RangeValue;

      if (selecting === 'start' || (!start && !end)) {
        updateValue([date, null]);
        setSelecting('end');
      } else if (selecting === 'end' || (start && !end)) {
        if (date >= start!) {
          updateValue([start, date]);
        } else {
          updateValue([date, start]);
        }
        setSelecting(null);
        setOpen(false);
      } else {
        updateValue([date, null]);
        setSelecting('end');
      }
    } else {
      updateValue(date);
      setOpen(false);
    }
  }, [isRange, finalValue, selecting, isDateDisabled, updateValue]);

  // 生成日历数据
  const generateCalendar = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // 填充前面的空白天数
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -firstDayOfWeek + i + 1);
      days.push(prevDate);
    }

    // 填充当月天数
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // 填充后面的空白天数到满6行
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push(nextDate);
    }

    return days;
  }, [currentDate]);

  const calendarDays = generateCalendar();

  // 清除选择
  const clearValue = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const emptyValue = isRange ? [null, null] : null;
    updateValue(emptyValue);
    setSelecting(null);
    onClear?.();
  }, [isRange, updateValue, onClear]);

  // 选择今天
  const selectToday = useCallback(() => {
    const today = new Date();
    if (isRange) {
      updateValue([today, today]);
    } else {
      updateValue(today);
    }
    setOpen(false);
  }, [isRange, updateValue]);

  // 更新面板位置
  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    setPosition({
      top: rect.bottom + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
    });
  }, []);

  // 点击输入框
  const handleClick = useCallback(() => {
    if (disabled) return;

    setOpen(!open);
    if (isRange && !selecting) {
      setSelecting('start');
    }
  }, [disabled, open, isRange, selecting]);

  // 键盘事件处理
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        if (!open) {
          setOpen(true);
        }
        break;
      case 'Escape':
        setOpen(false);
        setSelecting(null);
        break;
    }
  }, [disabled, open]);

  // 监听位置变化
  useEffect(() => {
    if (open) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [open, updatePosition]);

  // 点击外部关闭
  useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          panelRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          !panelRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          setSelecting(null);
          onOpenChange?.(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onOpenChange]);

  // 监听开关状态变化
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // 获取输入框类名
  const getInputClassName = () => {
    const classes = [styles.datePicker];
    classes.push(styles[`datePicker-${size}`]);
    if (disabled) classes.push(styles.disabled);
    if (open) classes.push(styles.open);
    if (isRange) classes.push(styles.range);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // 获取日期单元格类名
  const getDayCellClassName = (date: Date | null) => {
    if (!date) return styles.dayCell;

    const classes = [styles.dayCell];
    const today = new Date();
    const currentMonth = currentDate.getMonth();

    // 是否是当前月
    if (date.getMonth() !== currentMonth) {
      classes.push(styles.otherMonth);
    }

    // 是否是今天
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      classes.push(styles.today);
    }

    // 是否被选中
    if (isRange) {
      const [start, end] = finalValue as RangeValue;
      if (start && date.getTime() === start.getTime()) {
        classes.push(styles.selected, styles.rangeStart);
      }
      if (end && date.getTime() === end.getTime()) {
        classes.push(styles.selected, styles.rangeEnd);
      }
      if (isDateInRange(date)) {
        classes.push(styles.inRange);
      }
      if (isDateInHoverRange(date)) {
        classes.push(styles.inHoverRange);
      }
    } else {
      const selectedDate = finalValue as DateValue;
      if (selectedDate && date.getTime() === selectedDate.getTime()) {
        classes.push(styles.selected);
      }
    }

    // 是否被禁用
    if (isDateDisabled(date)) {
      classes.push(styles.disabled);
    }

    return classes.join(' ');
  };

  // 渲染输入显示
  const renderInput = () => {
    const displayText = getDisplayText();

    if (isRange) {
      const [startText, endText] = displayText as [string, string];
      return (
        <div className={styles.rangeInput}>
          <input
            className={styles.input}
            value={startText}
            placeholder={Array.isArray(placeholder) ? placeholder[0] : '开始日期'}
            readOnly
          />
          <span className={styles.separator}>~</span>
          <input
            className={styles.input}
            value={endText}
            placeholder={Array.isArray(placeholder) ? placeholder[1] : '结束日期'}
            readOnly
          />
        </div>
      );
    }

    return (
      <input
        className={styles.input}
        value={displayText as string}
        placeholder={placeholder as string || '请选择日期'}
        readOnly
      />
    );
  };

  // 渲染日历面板
  const renderCalendar = () => {
    if (!open) return null;

    const panel = (
      <div
        ref={panelRef}
        className={`${styles.panel} ${popupClassName || ''}`}
        style={{
          top: position.top,
          left: position.left,
          minWidth: position.width,
          zIndex: 1050,
          ...popupStyle,
        }}
      >
        {/* 头部 */}
        <div className={styles.header}>
          <button
            className={styles.prevYear}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()))}
          >
            «
          </button>
          <button
            className={styles.prevMonth}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            ‹
          </button>
          <span className={styles.monthYear}>
            {currentDate.getFullYear()}年 {MONTHS[currentDate.getMonth()]}
          </span>
          <button
            className={styles.nextMonth}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            ›
          </button>
          <button
            className={styles.nextYear}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()))}
          >
            »
          </button>
        </div>

        {/* 星期标题 */}
        <div className={styles.weekHeader}>
          {WEEKDAYS.map(day => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        {/* 日期网格 */}
        <div className={styles.dateGrid}>
          {calendarDays.map((date, index) => (
            <div
              key={index}
              className={getDayCellClassName(date)}
              onClick={() => date && selectDate(date)}
              onMouseEnter={() => date && setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
            >
              {date?.getDate()}
            </div>
          ))}
        </div>

        {/* 底部 */}
        {showToday && (
          <div className={styles.footer}>
            <button className={styles.todayBtn} onClick={selectToday}>
              今天
            </button>
          </div>
        )}
      </div>
    );

    const container = getPopupContainer ? getPopupContainer() : document.body;
    return ReactDOM.createPortal(panel, container);
  };

  const hasValue = isRange
    ? (finalValue as RangeValue)[0] || (finalValue as RangeValue)[1]
    : finalValue;

  return (
    <>
      <div
        ref={inputRef}
        className={getInputClassName()}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-disabled={disabled}
      >
        <div className={styles.inputWrapper}>
          {renderInput()}
        </div>
        <div className={styles.suffix}>
          {allowClear && hasValue && (
            <span className={styles.clearIcon} onClick={clearValue}>
              ×
            </span>
          )}
          <span className={styles.calendarIcon}>📅</span>
        </div>
      </div>
      {renderCalendar()}
    </>
  );
};

