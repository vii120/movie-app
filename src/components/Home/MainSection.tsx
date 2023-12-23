'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'
import { DEVICES } from '@/lib/utils/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css/effect-cards'

export const MainSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { movieList, fetchTrendingMovie } = useMovieStore()

  useEffect(() => {
    fetchTrendingMovie()
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.pageX, y: e.pageY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Container
      style={
        {
          '--x': mousePosition.x + 'px',
          '--y': mousePosition.y + 'px',
        } as React.CSSProperties
      }
    >
      <Background />
      <ContainerInner>
        <TitleWrapper>
          <Title>
            Get ready to embark on a cinematic <span>adventure</span> like no
            other
          </Title>
        </TitleWrapper>
        {!!movieList.length && (
          <SwiperWrapper>
            <Swiper
              style={{ width: '100%', height: '100%' }}
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              loop={true}
              autoplay={true}
              // peek prev/next slide
              slidesPerView={1.1}
              centeredSlides={true}
            >
              {movieList.slice(0, 5).map((movie, i) => (
                <SwiperSlide key={i}>
                  <SlidePoster
                    src={getImgFullPath(movie.poster_path)}
                    alt={movie.title}
                    crossOrigin="anonymous"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        )}
      </ContainerInner>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding: 24px 36px;
`

const ContainerInner = styled.div`
  max-width: 1100px;
  min-height: 90vh;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  @media screen and (${DEVICES.md}) {
    flex-direction: column;
    margin-bottom: 100px;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: -1;
  background-color: #fff2;
  background-image: radial-gradient(transparent 8%, var(--primary-bg) 0),
    radial-gradient(
      150px at var(--x) var(--y),
      var(--secondary-color),
      transparent
    );
  background-repeat: repeat, no-repeat;
  background-size: 30px 30px, auto;
  mask: linear-gradient(black 0% 90%, #fff0);
  -webkit-mask: linear-gradient(black 0% 90%, #fff0);
  will-change: background-image;
`

const TitleWrapper = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  @media screen and (${DEVICES.md}) {
    width: auto;
    flex-direction: column;
    text-align: center;
  }
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 36px;
  text-wrap: balance;
  line-height: 1.7;
  span {
    display: inline-block;
    border-radius: 36px;
    border: 1px solid var(--secondary-color);
    padding: 0 16px;
    color: var(--secondary-color);
    transition: all 0.2s;
    cursor: crosshair;
    will-change: color, background-color;
    &:hover {
      color: var(--primary-bg);
      background-color: var(--secondary-color);
    }
  }
  @media screen and (${DEVICES.md}) {
    font-size: 28px;
  }
`

const SwiperWrapper = styled.div`
  width: 320px;
  margin-right: 50px; // slider overflow space
  @media screen and (${DEVICES.md}) {
    margin-right: 0;
  }
  .swiper-slide {
    filter: brightness(0.6);
    border-radius: 12px;
    transition: all 0.3s;
  }
  .swiper-slide-active {
    filter: none;
    box-shadow: 0 0 10px #333;
  }
`

const SlidePoster = styled.img`
  display: block;
  width: 100%;
`
