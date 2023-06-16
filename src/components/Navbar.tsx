import { useState, ReactNode } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <Container>
      <Logo>logo</Logo>
      <Link href="/movie">movie</Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const Logo = styled.div`
  margin-right: auto;
`
