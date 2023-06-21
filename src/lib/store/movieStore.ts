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
  genreById: () => Record<number, string>
}

export const useMovieStore = create<MovieState>((set, get) => ({
  moviePage: 0,
  movieList: [],
  movieGenres: [],
  searchPage: 0,
  fetchTrendingMovie: async () => {
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ type: 'week', lang })
    const url = `/api/movie/trending${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ moviePage: data.page })
    set((state) => ({ ...state.movieList, movieList: data.results }))
  },
  fetchMovieGenres: async () => {
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ lang })
    const url = `/api/movie/genre${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ movieGenres: data.genres })
  },
  onSearchMovie: async (query: string) => {
    if (query === '') return
    const { lang } = useUserStore.getState()
    const queryString = getQueryString({ lang, query, page: 1 }) // @todo: handle page
    const url = `/api/movie/search${queryString}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ movieList: data.results })
  },
  genreById: () =>
    get().movieGenres.reduce((prev, el) => ({ ...prev, [el.id]: el.name }), {}),
}))

export default useMovieStore
