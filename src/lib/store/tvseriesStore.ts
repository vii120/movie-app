import { create } from 'zustand'
import { TvseriesItemType, TvseriesGenreType } from '@/lib/types'
import { useUserStore, useApiStore } from '@/lib/store'
import { getQueryString } from '@/lib/utils/helpers'

type TvseriesState = {
  tvseriesPage: number
  tvseriesList: TvseriesItemType[]
  tvseriesGenres: TvseriesGenreType[]

  fetchTrendingTvseries: () => void
  fetchTvseriesGenres: () => void
  onSearchTvseries: (genre: number) => void

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
    const res = await useApiStore.getState().fetchTrending(queryString)
    set((state) => ({
      tvseriesList: [...state.tvseriesList, ...res.results],
      tvseriesPage: res.page,
    }))
  },
  fetchTvseriesGenres: async () => {
    const queryString = getQueryString({ ...get().computed.defaultQueries })
    const res = await useApiStore.getState().fetchGenres(queryString)

    set({ tvseriesGenres: res.genres })
  },
  onSearchTvseries: async (genre) => {
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      genre,
    }) // @todo: handle page
    const res = await useApiStore.getState().onSearch(queryString)
    set({ tvseriesList: res.results })
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
