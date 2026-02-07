export type TNotificationType = "success" | "error" | "info";

export type TNotification = {
    id: string;
    message: string;
    type: TNotificationType;
};

export type TNotificationStore = {
    notifications: TNotification[];
    show: (message: string, type?: TNotificationType) => void;
    remove: (id: string) => void;
};