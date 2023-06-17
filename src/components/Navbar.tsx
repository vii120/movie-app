'use client'
import styled from 'styled-components'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <Container>
      <Logo href="/">logo</Logo>
      <Link href="/movie">movie</Link>
    </Container>
  )
}

const Container = styled.div`
  height: 50px;
  padding: 12px 36px;
  display: flex;
  align-items: center;
  gap: 12px;
`
const Logo = styled(Link)`
  margin-right: auto;
`
