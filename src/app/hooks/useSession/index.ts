import { create } from "zustand"
import { getUser } from "../../../modules/user"
import type { TUseSession } from "./type"

export const useSession = create<TUseSession>((set) => ({
    Session: undefined,
    isLoading: false,

    setSession: (session) => set({ Session: session }),
    clearSession: () => set({ Session: undefined }),

    bootstrap: async () => {
        set({ isLoading: true })

        try {
            const data = await getUser()
            set({ Session: data.data })
        } catch {
            set({ Session: undefined })
        } finally {
            set({ isLoading: false })
        }
    }
}))
