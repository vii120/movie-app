import { create } from 'zustand'
import { getQueryString } from '@/lib/utils/helpers'

type Action = {
  fetchTrending: (query: Record<string, any>) => any
  fetchGenres: (query: Record<string, any>) => any
  onSearch: (query: Record<string, any>) => any
}

export const useApiStore = create<Action>((set, get) => ({
  fetchTrending: async (query) => {
    const url = `/api/trending${getQueryString(query)}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
  fetchGenres: async (query) => {
    const url = `/api/genre${getQueryString(query)}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
  onSearch: async (query) => {
    const url = `/api/discover${getQueryString(query)}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    return data
  },
}))

export default useApiStore
