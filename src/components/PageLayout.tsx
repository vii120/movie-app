'use client'

import styled from 'styled-components'
import { DEVICES } from '@/lib/utils/constants'
import { InfoCard } from '@/components/InfoCard'
import { GenreGroup } from '@/components/GenreGroup'
import { TvseriesItemType, MovieItemType, GenreType } from '@/lib/types'

interface PageLayoutProps {
  list: {
    id: number
    name: string
    date: string
    vote_average: number
    poster_path: string
  }[]
  genres: GenreType[]
  onSearch: (id: number) => void
}

export const PageLayout = ({ list, genres, onSearch }: PageLayoutProps) => {
  return (
    <Container>
      <GenreGroup genreList={genres} onClick={(id) => onSearch(id)} />
      <CardList>
        {list.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              date={item.date}
              rating={item.vote_average}
              posterPath={item.poster_path}
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
