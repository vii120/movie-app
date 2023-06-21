'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTvseriesStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'

export default function Movie() {
  const {
    tvseriesList,
    fetchTrendingTvseries,
    fetchTvseriesGenres,
    onSearchTvseries,
  } = useTvseriesStore()
  const genreById = useTvseriesStore((state) => state.computed.genreById)

  useEffect(() => {
    if (tvseriesList.length === 0) {
      fetchTrendingTvseries()
    }
    if (Object.keys(genreById).length === 0) {
      fetchTvseriesGenres()
    }
  }, [])

  return (
    <Container>
      {tvseriesList.map((tvseries) => {
        const year = new Date(tvseries.first_air_date).getFullYear()
        return (
          <Card key={tvseries.id} data-id={tvseries.id}>
            <div>
              {tvseries.name} ({year})
            </div>
            <div>{tvseries.vote_average.toFixed(1)}/10</div>
            <div>
              {tvseries.genre_ids.map((id) => genreById[id]).join(', ')}
            </div>
            <Poster
              src={getImgFullPath(tvseries.poster_path)}
              alt={tvseries.name}
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
`

const Poster = styled.img`
  display: block;
  width: 100%;
`
