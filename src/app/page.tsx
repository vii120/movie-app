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
          // prevent swiping multiple slides at once
          onRealIndexChange={(swiper) => {
            swiper.allowTouchMove = false
            swiper.unsetGrabCursor()
          }}
          onTouchEnd={(swiper) => {
            swiper.allowTouchMove = true
          }}
        >
          {Array.from(Array(5)).map((_, i) => (
            <SwiperSlide key={i} style={{ background: 'orange' }}>
              slide {i}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
`

const TitleWrapper = styled.div``

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 60px;
`
const Description = styled.div`
  line-height: 1.5;
`

const SwiperWrapper = styled.div`
  width: 240px;
  height: 320px;
  margin-right: 50px;
`
