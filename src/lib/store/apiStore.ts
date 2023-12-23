import { create } from 'zustand'

type Action = {
  fetchTrending: (queryString: string) => any
  fetchGenres: (queryString: string) => any
  onSearch: (queryString: string) => any
}

export const useApiStore = create<Action>((set, get) => ({
  fetchTrending: async (queryString) => {
    const url = `/api/trending${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
  fetchGenres: async (queryString) => {
    const url = `/api/genre${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
  onSearch: async (queryString) => {
    const url = `/api/discover${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
}))

export default useApiStore
