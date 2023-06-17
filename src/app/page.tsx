'use client'
import Image from 'next/image'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css/effect-cards'

export default function Home() {
  return (
    <Container>
      <TitleWrapper>
        <Title>The Movie Planet</Title>
        <Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          repudiandae!
        </Description>
        <Button>explore</Button>
      </TitleWrapper>

      <SwiperWrapper>
        <Swiper
          style={{ width: '100%', height: '100%' }}
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          loop={true}
          // peek prev/next slide
          slidesPerView={1.1}
          centeredSlides={true}
        >
          {Array.from(Array(5)).map((_, i) => (
            <SwiperSlide key={i}>
              <Card> slide {i}</Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  height: 80vh;
  margin: 0 auto;
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
`

const TitleWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 60px;
`
const Description = styled.div`
  line-height: 1.5;
`

const SwiperWrapper = styled.div`
  width: 300px;
  height: 420px;
  margin-right: 50px;
`

const Card = styled.div`
  height: 100%;
  background: orange;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`
