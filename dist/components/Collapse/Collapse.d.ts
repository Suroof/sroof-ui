import React, { ReactNode, FC } from 'react';
export interface CollapsePanelProps {
    panelKey: string;
    header: ReactNode;
    disabled?: boolean;
    children: ReactNode;
}
export interface CollapseProps {
    accordion?: boolean;
    defaultActiveKey?: string | string[];
    children: React.ReactElement<CollapsePanelProps> | React.ReactElement<CollapsePanelProps>[];
}
export declare const Collapse: FC<CollapseProps> & {
    Panel: FC<CollapsePanelProps>;
};
//# sourceMappingURL=Collapse.d.ts.map