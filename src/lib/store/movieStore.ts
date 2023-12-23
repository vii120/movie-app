import { create } from 'zustand'
import { MovieItemType, GenreType } from '@/lib/types'
import { useUserStore, useApiStore } from '@/lib/store'
import { getQueryString } from '@/lib/utils/helpers'

type MovieState = {
  moviePage: number
  movieList: MovieItemType[]
  movieSearchList: MovieItemType[]
  movieGenres: GenreType[]

  fetchTrendingMovie: () => void
  fetchMovieGenres: () => void
  onSearchMovie: (genre: number) => void

  computed: {
    genreById: Record<number, string>
    defaultQueries: Record<string, string>
  }
}

export const useMovieStore = create<MovieState>((set, get) => ({
  moviePage: 0,
  movieList: [],
  movieSearchList: [],
  movieGenres: [],
  searchPage: 0,
  fetchTrendingMovie: async () => {
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      type: 'week',
    })
    const res = await useApiStore.getState().fetchTrending(queryString)
    set((state) => ({
      movieList: [...state.movieList, ...res.results],
      moviePage: res.page,
    }))
  },
  fetchMovieGenres: async () => {
    const queryString = getQueryString(get().computed.defaultQueries)
    const res = await useApiStore.getState().fetchGenres(queryString)
    set({ movieGenres: res.genres })
  },
  onSearchMovie: async (genre) => {
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      genre,
    })
    const res = await useApiStore.getState().onSearch(queryString)
    set({ movieSearchList: res.results })
  },

  computed: {
    get genreById() {
      return get().movieGenres.reduce(
        (prev, el) => ({ ...prev, [el.id]: el.name }),
        {},
      )
    },
    get defaultQueries() {
      const { lang } = useUserStore.getState()
      return { media: 'movie', lang }
    },
  },
}))

export default useMovieStore
