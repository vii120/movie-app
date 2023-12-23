'use client'

import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import { DEVICES } from '@/lib/utils/constants'
import { InfoCard } from '@/components/InfoCard'
import { GenreGroup } from '@/components/GenreGroup'

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
    <Container>
      <GenreGroup genreList={movieGenres} onClick={(id) => onSearchMovie(id)} />
      <CardList>
        {list.map((movie) => {
          return (
            <Card
              key={movie.id}
              id={movie.id}
              name={movie.title}
              date={movie.release_date}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          )
        })}
      </CardList>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 36px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 36px;
  @media screen and (${DEVICES.md}) {
    flex-direction: column;
  }
`

const CardList = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 36px;
  @media screen and (${DEVICES.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Card = styled(InfoCard)``
