'use client'

import { useEffect, useMemo } from 'react'
import { useMovieStore } from '@/lib/store'
import { PageLayout } from '@/components/PageLayout'

export default function Movie() {
  const {
    movieList,
    movieSearchList,
    movieGenres,
    fetchTrendingMovie,
    fetchMovieGenres,
    onSearchMovie,
  } = useMovieStore()

  const list = useMemo(() => {
    if (movieSearchList?.length) {
      return movieSearchList
    }
    return movieList
  }, [movieList, movieSearchList])

  useEffect(() => {
    fetchTrendingMovie()
    fetchMovieGenres()
  }, [])

  return (
    <PageLayout
      list={list.map((movie) => ({
        id: movie.id,
        name: movie.title,
        date: movie.release_date,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
      }))}
      genres={movieGenres}
      onSearch={onSearchMovie}
    />
  )
}
