import { create } from 'zustand'
import { TvseriesListType, TvseriesGenreType } from '@/lib/types'
import { useUserStore } from '@/lib/store'
import { getQueryString } from '@/lib/utils/helpers'

type TvseriesState = {
  tvseriesPage: number
  tvseriesList: TvseriesListType[]
  tvseriesGenres: TvseriesGenreType[]
  fetchTrendingTvseries: () => void
  fetchTvseriesGenres: () => void
  onSearchTvseries: (query: string) => void
  computed: {
    genreById: Record<number, string>
    defaultQueries: Record<string, string>
  }
}

export const useTvseriesStore = create<TvseriesState>((set, get) => ({
  tvseriesPage: 0,
  tvseriesList: [],
  tvseriesGenres: [],
  searchPage: 0,
  fetchTrendingTvseries: async () => {
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      type: 'week',
    })
    const url = `/api/trending${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesPage: data.page })
    set((state) => ({ tvseriesList: [...state.tvseriesList, ...data.results] }))
  },
  fetchTvseriesGenres: async () => {
    const queryString = getQueryString({ ...get().computed.defaultQueries })
    const url = `/api/genre${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesGenres: data.genres })
  },
  onSearchTvseries: async (query: string) => {
    if (query === '') return
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      query,
      page: 1,
    }) // @todo: handle page
    const url = `/api/search${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesList: data.results })
  },
  computed: {
    get genreById() {
      return get().tvseriesGenres.reduce(
        (prev, el) => ({ ...prev, [el.id]: el.name }),
        {},
      )
    },
    get defaultQueries() {
      const { lang } = useUserStore.getState()
      return { media: 'tv', lang }
    },
  },
}))

export default useTvseriesStore
