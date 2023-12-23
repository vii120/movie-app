import styled from 'styled-components'

type GenreTagProps = {
  children: React.ReactNode
  className?: string
}

export const GenreTag = ({ children, className }: GenreTagProps) => {
  return <GenreTagWrapper className={className}>{children}</GenreTagWrapper>
}

const GenreTagWrapper = styled.div`
  padding: 6px 12px;
  border-radius: 24px;
  border: 1px solid;
  font-weight: 100;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`
