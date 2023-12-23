import { create } from 'zustand'
import { MovieItemType, GenreType } from '@/lib/types'
import { useApiStore } from '@/lib/store'

type MovieState = {
  movieList: MovieItemType[]
  movieSearchList: MovieItemType[]
  movieGenres: GenreType[]

  fetchTrendingMovie: () => void
  fetchMovieGenres: () => void
  onSearchMovie: (genre: number) => void

  computed: {
    genreById: Record<number, string>
  }
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movieList: [],
  movieSearchList: [],
  movieGenres: [],

  fetchTrendingMovie: async () => {
    if (get().movieList.length) {
      return
    }
    const res = await useApiStore.getState().fetchTrending({ media: 'movie' })
    set({ movieList: res.results })
  },
  fetchMovieGenres: async () => {
    if (get().movieGenres.length) {
      return
    }
    const res = await useApiStore.getState().fetchGenres({ media: 'movie' })
    set({ movieGenres: res.genres })
  },
  onSearchMovie: async (genre) => {
    const res = await useApiStore.getState().onSearch({ media: 'movie', genre })
    set({ movieSearchList: res.results })
  },

  computed: {
    get genreById() {
      return get().movieGenres.reduce(
        (prev, el) => ({ ...prev, [el.id]: el.name }),
        {},
      )
    },
  },
}))

export default useMovieStore
