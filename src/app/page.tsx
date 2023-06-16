'use client'
import Image from 'next/image'
import styled from 'styled-components'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/Button'

export default function Home() {
  return (
    <Container>
      <Navbar />

      <Title>The Movie Planet</Title>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
        repudiandae!
      </div>
      <Button>explore</Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 36px;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 60px;
`
