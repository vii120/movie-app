import { create } from 'zustand'
import { MovieListType, MovieGenreType } from '@/lib/types'
import { useUserStore } from '@/lib/store'
import { getQueryString } from '@/lib/utils/helpers'

type MovieState = {
  moviePage: number
  movieList: MovieListType[]
  movieGenres: MovieGenreType[]
  fetchTrendingMovie: () => void
  fetchMovieGenres: () => void
  onSearchMovie: (query: string) => void
  computed: {
    genreById: Record<number, string>
    defaultQueries: Record<string, string>
  }
}

export const useMovieStore = create<MovieState>((set, get) => ({
  moviePage: 0,
  movieList: [],
  movieGenres: [],
  searchPage: 0,
  fetchTrendingMovie: async () => {
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      type: 'week',
    })
    const url = `/api/trending${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ moviePage: data.page })
    set((state) => ({ movieList: [...state.movieList, ...data.results] }))
  },
  fetchMovieGenres: async () => {
    const queryString = getQueryString({ ...get().computed.defaultQueries })
    const url = `/api/genre${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ movieGenres: data.genres })
  },
  onSearchMovie: async (query: string) => {
    if (query === '') return
    const queryString = getQueryString({
      ...get().computed.defaultQueries,
      query,
      page: 1,
    }) // @todo: handle page
    const url = `/api/search${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ movieList: data.results })
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
