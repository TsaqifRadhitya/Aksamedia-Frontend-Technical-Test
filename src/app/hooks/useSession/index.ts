import { create } from "zustand"
import type { TUseSession } from "./type"

export const useSession =
    create<TUseSession>((set) => ({
        Session: undefined,
        clearSession: () => set({ Session: undefined }),
        setSession: (session) => set({ Session: session })
    }))
