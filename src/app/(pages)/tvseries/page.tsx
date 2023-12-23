'use client'

import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useTvseriesStore } from '@/lib/store'
import { DEVICES } from '@/lib/utils/constants'
import { InfoCard } from '@/components/InfoCard'
import { GenreGroup } from '@/components/GenreGroup'

export default function Movie() {
  const {
    tvseriesList,
    tvseriesSearchList,
    tvseriesGenres,
    fetchTrendingTvseries,
    fetchTvseriesGenres,
    onSearchTvseries,
  } = useTvseriesStore()

  const list = useMemo(() => {
    if (tvseriesSearchList?.length) {
      return tvseriesSearchList
    }
    return tvseriesList
  }, [tvseriesList, tvseriesSearchList])

  useEffect(() => {
    fetchTrendingTvseries()
    fetchTvseriesGenres()
  }, [])

  return (
    <Container>
      <GenreGroup
        genreList={tvseriesGenres}
        onClick={(id) => onSearchTvseries(id)}
      />
      <CardList>
        {list.map((series) => {
          return (
            <Card
              key={series.id}
              id={series.id}
              name={series.name}
              date={series.first_air_date}
              rating={series.vote_average}
              posterPath={series.poster_path}
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
