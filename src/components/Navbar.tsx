'use client'
import styled from 'styled-components'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <Container>
      <Logo href="/">MOVIE PLANET</Logo>
      <Link href="/movie">Movie</Link>
      <Link href="/tvseries">TV Series</Link>
      <Link
        href="https://github.com/vii120/movie-app"
        target="_blank"
        rel="noopener"
      >
        Github
      </Link>
    </Container>
  )
}

const Container = styled.div`
  height: 50px;
  padding: 12px 36px;
  display: flex;
  align-items: center;
  gap: 16px;
  a {
    padding: 6px 12px;
  }
`
const Logo = styled(Link)`
  margin-right: auto;
`
