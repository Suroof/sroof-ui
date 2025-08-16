import React from 'react';
export interface StepItem {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface StepsProps {
    current?: number;
    direction?: 'horizontal' | 'vertical';
    size?: 'default' | 'small';
    status?: 'wait' | 'process' | 'finish' | 'error';
    items: StepItem[];
    onChange?: (current: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
declare const Steps: React.FC<StepsProps>;
export default Steps;
//# sourceMappingURL=Steps.d.ts.map