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
  genreById: () => Record<number, string>
}

export const useTvseriesStore = create<TvseriesState>((set, get) => ({
  tvseriesPage: 0,
  tvseriesList: [],
  tvseriesGenres: [],
  searchPage: 0,
  fetchTrendingTvseries: async () => {
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ type: 'week', lang })
    const url = `/api/tvseries/trending${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesPage: data.page })
    set((state) => ({ ...state.tvseriesList, tvseriesList: data.results }))
  },
  fetchTvseriesGenres: async () => {
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ lang })
    const url = `/api/tvseries/genre${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesGenres: data.genres })
  },
  onSearchTvseries: async (query: string) => {
    if (query === '') return
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ lang, query, page: 1 }) // @todo: handle page
    const url = `/api/tvseries/search${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ tvseriesList: data.results })
  },
  genreById: () =>
    get().tvseriesGenres.reduce(
      (prev, el) => ({ ...prev, [el.id]: el.name }),
      {},
    ),
}))

export default useTvseriesStore
