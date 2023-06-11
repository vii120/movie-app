export type MovieListType = {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  release_date: string
}

export type MovieGenreType = {
  id: number
  name: string
}
