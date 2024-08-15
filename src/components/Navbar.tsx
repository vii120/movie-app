'use client'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const [isPageOnTop, setIsPageOnTop] = useState(true)
  const navbarObserverRef = useRef<HTMLDivElement>(null)
  const currentRoute = usePathname()

  const handleNavbarStyle = () => {
    if (!navbarObserverRef.current) {
      return
    }
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
        <NavLink
          href="/movie"
          className={currentRoute === '/movie' ? 'active' : ''}
        >
          Movie
        </NavLink>
        <NavLink
          href="/tvseries"
          className={currentRoute === '/tvseries' ? 'active' : ''}
        >
          TV Series
        </NavLink>
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
  will-change: backdrop-filter, border-color;

  &.highlight {
    backdrop-filter: blur(15px) brightness(0.8);
    border-color: inherit;
  }
  a {
    height: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    will-change: transform;
    &:hover {
      transform: scale(1.05);
    }
  }
`
const Logo = styled(Link)`
  margin-right: auto;
`

const NavLink = styled(Link)`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 60%;
    height: 2px;
    margin-bottom: 10px;
    transform: translateX(-50%) scale(0);
    background-color: currentColor;
    transition: all 0.3s;
  }
  &.active:before {
    transform: translateX(-50%) scale(1);
  }
`
