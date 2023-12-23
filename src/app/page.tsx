'use client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { MainSection } from '@/components/Home/MainSection'
import { Showcase } from '@/components/Home/Showcase'

export default function Home() {
  return (
    <Container>
      <MainSection />
      <Showcase />
    </Container>
  )
}

const Container = styled.div``
