'use client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { useMovieStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'
import { DEVICES } from '@/lib/utils/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css/effect-cards'

export const MainSection = () => {
  const { movieList, fetchTrendingMovie } = useMovieStore()

  useEffect(() => {
    if (movieList.length === 0) {
      fetchTrendingMovie()
    }
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', e.pageX + 'px')
      document.documentElement.style.setProperty('--y', e.pageY + 'px')
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Container>
      <Background />
      <ContainerInner>
        <TitleWrapper>
          <Title>Movie Planet</Title>
          <Description>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium, repudiandae!
          </Description>
          <Button>explore</Button>
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
  min-height: 80vh;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  @media screen and (${DEVICES.md}) {
    flex-direction: column;
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
  /* mask: linear-gradient(#fff0, black 10% 90%, #fff0);
  -webkit-mask: linear-gradient(#fff0, black 10% 90%, #fff0); */
  will-change: background-image;
`

const TitleWrapper = styled.div`
  width: 500px;
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
