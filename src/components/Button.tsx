import { useState } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'

export const Button: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode }>
> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div``
