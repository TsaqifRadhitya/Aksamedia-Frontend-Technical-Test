import { create } from "zustand";
import type { TNotificationStore } from "./type";

export const useNotification = create<TNotificationStore>((set) => ({
    notifications: [],

    show: (message, type = "info") => {
        const id = crypto.randomUUID();
        set((state) => ({
            notifications: [
                ...state.notifications,
                { id, message, type },
            ],
        }));

        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            }));
        }, 3000);
    },

    remove: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
}));
