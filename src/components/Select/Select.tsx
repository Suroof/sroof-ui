import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styles from './Select.module.scss';

export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface SelectOptGroup {
  label: React.ReactNode;
  key?: string;
  options: SelectOption[];
  className?: string;
}

export interface SelectProps {
  /** 选项数据或选项组数据 */
  options?: (SelectOption | SelectOptGroup)[];
  /** 当前选中的值（受控） */
  value?: string | number | (string | number)[];
  /** 默认选中的值（非受控） */
  defaultValue?: string | number | (string | number)[];
  /** 是否多选 */
  mode?: 'multiple' | 'tags' | undefined;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否可搜索 */
  showSearch?: boolean;
  /** 搜索时对选项的过滤函数 */
  filterOption?: (input: string, option?: SelectOption) => boolean;
  /** 占位符 */
  placeholder?: string;
  /** 尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 下拉菜单类名 */
  dropdownClassName?: string;
  /** 下拉菜单样式 */
  dropdownStyle?: React.CSSProperties;
  /** 下拉菜单的挂载节点 */
  getPopupContainer?: () => HTMLElement;
  /** 最多显示多少个选中项 */
  maxTagCount?: number;
  /** 隐藏超出maxTagCount的选中项时的占位符 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: (string | number)[]) => React.ReactNode);
  /** 下拉菜单最大高度 */
  listHeight?: number;
  /** 是否开启虚拟滚动 */
  virtual?: boolean;
  /** 选择时的回调 */
  onChange?: (value: string | number | (string | number)[], option?: SelectOption | SelectOption[]) => void;
  /** 搜索时的回调 */
  onSearch?: (value: string) => void;
  /** 获得焦点时的回调 */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  /** 失去焦点时的回调 */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  /** 下拉框显示/隐藏时的回调 */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /** 清除时的回调 */
  onClear?: () => void;
  /** 取消选中时的回调 */
  onDeselect?: (value: string | number, option: SelectOption) => void;
  /** 自定义选中项的渲染 */
  tagRender?: (props: { label: React.ReactNode; value: string | number; disabled: boolean; onClose: () => void }) => React.ReactElement;
  /** 自定义下拉选项的渲染 */
  optionRender?: (option: SelectOption, info: { index: number }) => React.ReactNode;
  /** 空数据时的显示内容 */
  notFoundContent?: React.ReactNode;
  /** 自定义下拉列表滚动条 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
}

export const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  defaultValue,
  mode,
  disabled = false,
  allowClear = false,
  showSearch = false,
  filterOption,
  placeholder = '请选择',
  size = 'middle',
  className,
  style,
  dropdownClassName,
  dropdownStyle,
  getPopupContainer,
  maxTagCount,
  maxTagPlaceholder,
  listHeight = 256,
  virtual = false,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onDropdownVisibleChange,
  onClear,
  onDeselect,
  tagRender,
  optionRender,
  notFoundContent = '无数据',
  dropdownRender,
}) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue || (mode === 'multiple' || mode === 'tags' ? [] : '')
  );
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const finalValue = isControlled ? value : internalValue;
  const isMultiple = mode === 'multiple' || mode === 'tags';

  // 扁平化选项
  const flatOptions = useMemo(() => {
    const result: SelectOption[] = [];
    options.forEach((item) => {
      if ('options' in item) {
        result.push(...item.options);
      } else {
        result.push(item);
      }
    });
    return result;
  }, [options]);

  // 过滤后的选项
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchValue) return options;

    const defaultFilter = (input: string, option?: SelectOption) => {
      if (!option) return false;
      const label = String(option.label);
      return label.toLowerCase().includes(input.toLowerCase());
    };

    const filter = filterOption || defaultFilter;

    return options
      .map((item) => {
        if ('options' in item) {
          const filteredSubOptions = item.options.filter((option) => filter(searchValue, option));
          return filteredSubOptions.length > 0 ? { ...item, options: filteredSubOptions } : null;
        } else {
          return filter(searchValue, item) ? item : null;
        }
      })
      .filter(Boolean) as (SelectOption | SelectOptGroup)[];
  }, [options, showSearch, searchValue, filterOption]);

  // 获取选中的选项
  const selectedOptions = useMemo(() => {
    if (!finalValue) return [];
    const values = Array.isArray(finalValue) ? finalValue : [finalValue];
    return flatOptions.filter((option) => values.includes(option.value));
  }, [finalValue, flatOptions]);

  // 更新选中值
  const updateValue = useCallback(
    (newValue: string | number | (string | number)[], selectedOption?: SelectOption | SelectOption[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue, selectedOption);
    },
    [isControlled, onChange]
  );

  // 选择选项
  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      if (isMultiple) {
        const currentValues = Array.isArray(finalValue) ? finalValue : [];
        const isSelected = currentValues.includes(option.value);

        if (isSelected) {
          const newValues = currentValues.filter((v) => v !== option.value);
          const newOptions = selectedOptions.filter((opt) => opt.value !== option.value);
          updateValue(newValues, newOptions);
          onDeselect?.(option.value, option);
        } else {
          const newValues = [...currentValues, option.value];
          const newOptions = [...selectedOptions, option];
          updateValue(newValues, newOptions);
        }
      } else {
        updateValue(option.value, option);
        setOpen(false);
        setSearchValue('');
      }
    },
    [isMultiple, finalValue, selectedOptions, updateValue, onDeselect]
  );

  // 移除选中项
  const removeSelectedItem = useCallback(
    (valueToRemove: string | number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isMultiple && Array.isArray(finalValue)) {
        const newValues = finalValue.filter((v) => v !== valueToRemove);
        const removedOption = selectedOptions.find((opt) => opt.value === valueToRemove);
        const newOptions = selectedOptions.filter((opt) => opt.value !== valueToRemove);
        updateValue(newValues, newOptions);
        if (removedOption) {
          onDeselect?.(valueToRemove, removedOption);
        }
      }
    },
    [isMultiple, finalValue, selectedOptions, updateValue, onDeselect]
  );

  // 清除所有选中项
  const clearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const emptyValue = isMultiple ? [] : '';
      updateValue(emptyValue, isMultiple ? [] : undefined);
      onClear?.();
      if (showSearch) {
        setSearchValue('');
      }
    },
    [isMultiple, updateValue, onClear, showSearch]
  );

  // 更新下拉框位置
  const updatePosition = useCallback(() => {
    if (!selectRef.current) return;

    const rect = selectRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    setPosition({
      top: rect.bottom + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
    });
  }, []);

  // 处理键盘事件
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, flatOptions.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (open) {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (open && focusedIndex >= 0) {
            selectOption(flatOptions[focusedIndex]);
          } else {
            setOpen(!open);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          setSearchValue('');
          break;
        case 'Backspace':
          if (isMultiple && Array.isArray(finalValue) && finalValue.length > 0 && !searchValue) {
            const lastValue = finalValue[finalValue.length - 1];
            removeSelectedItem(lastValue);
          }
          break;
      }
    },
    [disabled, open, focusedIndex, flatOptions, selectOption, isMultiple, finalValue, searchValue, removeSelectedItem]
  );

  // 处理搜索输入
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchValue(newValue);
      onSearch?.(newValue);
      if (!open) {
        setOpen(true);
      }
    },
    [onSearch, open]
  );

  // 点击选择器
  const handleClick = useCallback(() => {
    if (disabled) return;

    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }

    setOpen(!open);
  }, [disabled, showSearch, open]);

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
          selectRef.current &&
          dropdownRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          setSearchValue('');
          onDropdownVisibleChange?.(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onDropdownVisibleChange]);

  // 监听开关状态变化
  useEffect(() => {
    onDropdownVisibleChange?.(open);
  }, [open, onDropdownVisibleChange]);

  // 获取选择器类名
  const getSelectClassName = () => {
    const classes = [styles.select];
    classes.push(styles[`select-${size}`]);
    if (disabled) classes.push(styles.disabled);
    if (open) classes.push(styles.open);
    if (isMultiple) classes.push(styles.multiple);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // 渲染选中项
  const renderSelection = () => {
    if (isMultiple && Array.isArray(finalValue)) {
      if (finalValue.length === 0) {
        return <span className={styles.placeholder}>{placeholder}</span>;
      }

      const visibleItems = maxTagCount ? finalValue.slice(0, maxTagCount) : finalValue;
      const hiddenCount = maxTagCount ? Math.max(0, finalValue.length - maxTagCount) : 0;

      return (
        <div className={styles.selectionContainer}>
          {visibleItems.map((val) => {
            const option = selectedOptions.find((opt) => opt.value === val);
            if (!option) return null;

            if (tagRender) {
              return tagRender({
                label: option.label,
                value: val,
                disabled: option.disabled || false,
                onClose: () => removeSelectedItem(val),
              });
            }

            return (
              <span key={val} className={styles.tag}>
                <span className={styles.tagContent}>{option.label}</span>
                <span className={styles.tagClose} onClick={(e) => removeSelectedItem(val, e)}>
                  ×
                </span>
              </span>
            );
          })}
          {hiddenCount > 0 && (
            <span className={styles.tag}>
              {typeof maxTagPlaceholder === 'function'
                ? maxTagPlaceholder(finalValue.slice(maxTagCount!))
                : maxTagPlaceholder || `+${hiddenCount}...`}
            </span>
          )}
        </div>
      );
    }

    const selectedOption = selectedOptions[0];
    if (selectedOption) {
      return <span className={styles.singleValue}>{selectedOption.label}</span>;
    }

    return <span className={styles.placeholder}>{placeholder}</span>;
  };

  // 渲染选项
  const renderOption = (option: SelectOption, index: number) => {
    const isSelected = Array.isArray(finalValue)
      ? finalValue.includes(option.value)
      : finalValue === option.value;
    const isFocused = index === focusedIndex;

    const optionClasses = [
      styles.option,
      isSelected && styles.selected,
      isFocused && styles.focused,
      option.disabled && styles.disabled,
      option.className
    ].filter(Boolean).join(' ');

    if (optionRender) {
      return (
        <div
          key={option.value}
          className={optionClasses}
          onClick={() => selectOption(option)}
          style={option.style}
        >
          {optionRender(option, { index })}
        </div>
      );
    }

    return (
      <div
        key={option.value}
        className={optionClasses}
        onClick={() => selectOption(option)}
        style={option.style}
      >
        {isMultiple && (
          <span className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}>
            {isSelected && '✓'}
          </span>
        )}
        <span className={styles.optionContent}>{option.label}</span>
      </div>
    );
  };

  // 渲染下拉菜单
  const renderDropdown = () => {
    if (!open) return null;

    let content;

    if (filteredOptions.length === 0) {
      content = <div className={styles.empty}>{notFoundContent}</div>;
    } else {
      let optionIndex = 0;
      content = filteredOptions.map((item) => {
        if ('options' in item) {
          return (
            <div key={item.key || String(item.label)} className={styles.optGroup}>
              <div className={styles.optGroupLabel}>{item.label}</div>
              <div className={styles.optGroupOptions}>
                {item.options.map((option) => renderOption(option, optionIndex++))}
              </div>
            </div>
          );
        } else {
          return renderOption(item, optionIndex++);
        }
      });
    }

    const dropdown = (
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${dropdownClassName || ''}`}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: position.width,
          maxHeight: listHeight,
          zIndex: 1050,
          ...dropdownStyle,
        }}
      >
        <div ref={optionsRef} className={styles.dropdownContent}>
          {content}
        </div>
      </div>
    );

    return dropdownRender ? dropdownRender(dropdown) : dropdown;
  };

  const container = getPopupContainer ? getPopupContainer() : document.body;

  return (
    <>
      <div
        ref={selectRef}
        className={getSelectClassName()}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <div className={styles.selector}>
          {renderSelection()}
          {showSearch && (
            <input
              ref={inputRef}
              className={styles.searchInput}
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setOpen(true)}
            />
          )}
        </div>
        <div className={styles.arrow}>
          {allowClear && (finalValue || (Array.isArray(finalValue) && finalValue.length > 0)) && (
            <span className={styles.clearIcon} onClick={clearAll}>
              ×
            </span>
          )}
          <span className={`${styles.arrowIcon} ${open ? styles.open : ''}`}>▼</span>
        </div>
      </div>
      {ReactDOM.createPortal(renderDropdown(), container)}
    </>
  );
};
