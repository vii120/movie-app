'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'

export default function Movie() {
  const {
    movieList,
    movieGenres,
    fetchTrendingMovie,
    fetchMovieGenres,
    onSearchMovie,
  } = useMovieStore()

  useEffect(() => {
    if (movieList.length === 0) {
      fetchTrendingMovie()
    }
    if (movieGenres.length === 0) {
      fetchMovieGenres()
    }
  }, [])

  return (
    <Container>
      {movieList.map((movie) => {
        const year = new Date(movie.release_date).getFullYear()
        return (
          <Card key={movie.id}>
            <div>
              {movie.title} ({year})
            </div>
            <div>{movie.vote_average.toFixed(1)}/10</div>
            <Poster
              src={getImgFullPath(movie.poster_path)}
              alt={movie.title}
              crossOrigin="anonymous"
            />
          </Card>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 12px 36px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
`

const Card = styled.div`
  width: 30%;
  padding: 24px;
`

const Poster = styled.img`
  display: block;
  width: 100%;
`
