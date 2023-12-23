import styled from 'styled-components'
import { GenreType } from '@/lib/types'
import { DEVICES } from '@/lib/utils/constants'

type GenreTagProps = {
  genreList: GenreType[]
  onClick?: (id: number) => void
}

export const GenreGroup = ({ genreList, onClick }: GenreTagProps) => {
  return (
    <GenreList>
      {genreList.map((genre) => (
        <GenreTag onClick={() => onClick && onClick(genre.id)} key={genre.id}>
          {genre.name}
        </GenreTag>
      ))}
    </GenreList>
  )
}

const GenreList = styled.div`
  position: sticky;
  top: 100px;
  max-width: 250px;
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

const GenreTag = styled.div`
  padding: 6px 12px;
  border-radius: 24px;
  border: 1px solid;
  font-weight: 100;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`
