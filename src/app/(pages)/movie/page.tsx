'use client'

import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import { DEVICES } from '@/lib/utils/constants'
import { InfoCard } from '@/components/InfoCard'
import { GenreTag } from '@/components/GenreTag'
import { SearchBar } from '@/components/SearchBar'

export default function Movie() {
  const {
    movieList,
    movieSearchList,
    movieGenres,
    fetchTrendingMovie,
    fetchMovieGenres,
  } = useMovieStore()

  const list = useMemo(() => {
    if (movieSearchList.length) {
      return movieSearchList
    }
    return movieList
  }, [movieList, movieSearchList])

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
      <SearchArea>
        <SearchBar />
        <GenreList>
          {movieGenres.map((genre) => (
            <GenreTag key={genre.id}>{genre.name}</GenreTag>
          ))}
        </GenreList>
      </SearchArea>
      <CardList>
        {list.map((movie) => {
          return (
            <MovieCard
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

const SearchArea = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
  @media screen and (${DEVICES.md}) {
    width: auto;
  }
`

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const CardList = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 36px;
`

const MovieCard = styled(InfoCard)``
