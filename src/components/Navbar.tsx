'use client'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export const Navbar = () => {
  const [isPageOnTop, setIsPageOnTop] = useState(true)
  const navbarObserverRef = useRef<HTMLDivElement>(null)
  const handleNavbarStyle = () => {
    if (!navbarObserverRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsPageOnTop(entry.isIntersecting)
    })
    observer.observe(navbarObserverRef.current)
  }

  useEffect(() => {
    handleNavbarStyle()
  }, [])

  return (
    <>
      <div ref={navbarObserverRef}></div>
      <Container className={isPageOnTop ? '' : 'highlight'}>
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
    </>
  )
}

const Container = styled.div`
  position: fixed;
  top: 12px;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 12px;
  margin: 0 36px;

  display: flex;
  gap: 16px;
  color: var(--secondary-color);
  z-index: 10;
  transition: all 0.3s;
  border-radius: 24px;
  border: 1px solid transparent;

  &.highlight {
    backdrop-filter: blur(15px) brightness(0.8);
    border-color: inherit;
  }
  a {
    height: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
  }
`
const Logo = styled(Link)`
  margin-right: auto;
`
