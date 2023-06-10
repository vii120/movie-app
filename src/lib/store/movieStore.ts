import { create } from 'zustand'
import { MovieListType, MovieGenreType } from '@/lib/types'
import { useUserStore } from '@/lib/store'

type MovieState = {
  moviePage: number
  movieList: MovieListType[]
  movieGenres: MovieGenreType[]
  fetchTrendMovie: () => void
  fetchMovieGenres: () => void
  genreById: () => Record<number, string>
}

export const useMovieStore = create<MovieState>((set, get) => ({
  moviePage: 0,
  movieList: [],
  movieGenres: [],
  fetchTrendMovie: async () => {
    const { lang } = useUserStore.getState()
    const url = `/api/movie/trend?type=week&lang=${lang}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    console.log('getTrendMovie', data)
    set({ moviePage: data.page })
    set((state) => ({ ...state.movieList, movieList: data.results }))
  },
  fetchMovieGenres: async () => {
    const { lang } = useUserStore.getState()
    const url = `/api/movie/genre?lang=${lang}`
    const res = await fetch(url, { method: 'GET' })
    const { data } = await res.json()
    set({ movieGenres: data.genres })
  },
  genreById: () =>
    get().movieGenres.reduce((prev, el) => ({ ...prev, [el.id]: el.name }), {}),
}))

export default useMovieStore
