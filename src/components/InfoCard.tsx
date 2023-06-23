import styled from 'styled-components'
import { getImgFullPath } from '@/lib/utils/helpers'

type InfoCardProps = {
  id: number
  name: string
  date: string
  rating: number
  posterPath: string
  className?: string
}

export const InfoCard = ({
  id,
  name,
  date,
  rating,
  posterPath,
  className,
}: InfoCardProps) => {
  return (
    <CardWrapper className={className}>
      <PosterWrapper>
        <Poster
          src={getImgFullPath(posterPath)}
          alt={name}
          crossOrigin="anonymous"
        />
        <InfoRate>
          <span>{rating.toFixed(1)}</span>/10
        </InfoRate>
      </PosterWrapper>

      <InfoTitle>{name}</InfoTitle>
      <InfoDate>{date}</InfoDate>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const InfoTitle = styled.div`
  font-weight: 700;
`

const InfoDate = styled.div`
  opacity: 0.7;
`

const InfoRate = styled.div`
  position: absolute;
  bottom: -12px;
  right: -12px;
  padding: 6px 12px;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  background-color: rgba(100, 100, 100, 0.3);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  span {
    font-size: 1.2rem;
  }
`
const PosterWrapper = styled.div`
  position: relative;
`
const Poster = styled.img`
  display: block;
  width: 100%;
  border-radius: 12px;
`
