import styled from 'styled-components'
import { GenreType } from '@/lib/types'
import { GenreTag } from '@/components/GenreTag'
import { DEVICES } from '@/lib/utils/constants'

type GenreTagProps = {
  genreList: GenreType[]
}

export const GenreGroup = ({ genreList }: GenreTagProps) => {
  return (
    <GenreList>
      {genreList.map((genre) => (
        <GenreTag key={genre.id}>{genre.name}</GenreTag>
      ))}
    </GenreList>
  )
}

const GenreList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  @media screen and (${DEVICES.md}) {
    max-width: 100%;
    padding-bottom: 16px;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
`
