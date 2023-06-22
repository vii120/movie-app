import { useEffect } from 'react'
import styled from 'styled-components'
import { GridBox } from './GridBox'

export const Showcase = () => {
  return (
    <Container>
      <GridBox1></GridBox1>
      <GridBox2></GridBox2>
      <GridBox3></GridBox3>
      <GridBox4></GridBox4>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 36px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 150px);
`

const GridBox1 = styled(GridBox)`
  grid-area: 1 / 1 / span 1 / span 2;
`
const GridBox2 = styled(GridBox)`
  grid-area: 1 / 3 / span 2 / span 1;
`
const GridBox3 = styled(GridBox)`
  grid-area: 2 / 1 / span 2 / span 2;
`
const GridBox4 = styled(GridBox)`
  grid-area: 3 / 3 / span 1 / span 1;
`
