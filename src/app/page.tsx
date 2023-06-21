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

export default function Home() {
  const { movieList, fetchTrendingMovie } = useMovieStore()

  useEffect(() => {
    if (movieList.length === 0) {
      fetchTrendingMovie()
    }
  }, [])

  return (
    <Container>
      <TitleWrapper>
        <Title>Movie Planet</Title>
        <Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          repudiandae!
        </Description>
        <Button>explore</Button>
      </TitleWrapper>

      {movieList.length && (
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
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  @media screen and (${DEVICES.md}) {
    flex-direction: column;
  }
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
  }
`

const SlidePoster = styled.img`
  display: block;
  width: 100%;
`
