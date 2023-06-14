import { create } from 'zustand'

type UserState = {
  lang: string
  updateLang: (lang: string) => void
  isInit: () => boolean
}

export const useUserStore = create<UserState>((set, get) => ({
  lang: 'en-US',
  updateLang: (lang: string) => set({ lang }),
  isInit: () => get().lang !== '',
}))

export default useUserStore
