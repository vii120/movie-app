import { create } from 'zustand'
import { TvseriesItemType, TvseriesGenreType } from '@/lib/types'
import { useApiStore } from '@/lib/store'

type TvseriesState = {
  tvseriesList: TvseriesItemType[]
  tvseriesGenres: TvseriesGenreType[]

  fetchTrendingTvseries: () => void
  fetchTvseriesGenres: () => void
  onSearchTvseries: (genre: number) => void

  computed: {
    genreById: Record<number, string>
  }
}

export const useTvseriesStore = create<TvseriesState>((set, get) => ({
  tvseriesList: [],
  tvseriesGenres: [],
  searchPage: 0,
  fetchTrendingTvseries: async () => {
    const res = await useApiStore.getState().fetchTrending({ media: 'tv' })
    set({ tvseriesList: res.results })
  },
  fetchTvseriesGenres: async () => {
    const res = await useApiStore.getState().fetchGenres({ media: 'tv' })

    set({ tvseriesGenres: res.genres })
  },
  onSearchTvseries: async (genre) => {
    const res = await useApiStore.getState().onSearch({ media: 'tv', genre })
    set({ tvseriesList: res.results })
  },
  computed: {
    get genreById() {
      return get().tvseriesGenres.reduce(
        (prev, el) => ({ ...prev, [el.id]: el.name }),
        {},
      )
    },
  },
}))

export default useTvseriesStore
