'use client'
import styled from 'styled-components'

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.span`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid;
  cursor: pointer;
`
