import React from "react";
export interface NotificationProps {
    closeIcon?: React.ReactNode;
    duration?: number | null;
    message?: string;
    onClick?: () => void;
    onClose?: () => void;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
    show: boolean;
}
export declare const Notification: React.FC<NotificationProps>;
//# sourceMappingURL=Notification.d.ts.map