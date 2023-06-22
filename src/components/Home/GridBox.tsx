import styled from 'styled-components'

export const GridBox = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <GridBoxWrapper className={className}>
      <GridBoxShadow />
      <GridBoxInner>{children}</GridBoxInner>
    </GridBoxWrapper>
  )
}

const GridBoxShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: inherit;
  background-image: linear-gradient(45deg, var(--secondary-color), #f1a0c8);
  filter: blur(10px);
  z-index: -1;
  pointer-events: none;

  opacity: 0;
  transition: all 0.3s;
`
const GridBoxWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  &:hover {
    ${GridBoxShadow} {
      opacity: 1;
    }
  }
`

const GridBoxInner = styled.div`
  height: 100%;
  border-radius: inherit;
  background-color: var(--primary-bg);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`
