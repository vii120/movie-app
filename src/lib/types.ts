export type MovieItemType = {
  id: number
  title: string
  original_title: string
  poster_path: string
  backdrop_path: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  release_date: string
  original_language: string
}

export type GenreType = {
  id: number
  name: string
}

export type TvseriesItemType = {
  id: number
  name: string
  original_name: string
  poster_path: string
  backdrop_path: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  first_air_date: string
  original_language: string
}

export type TvseriesGenreType = {
  id: number
  name: string
}
