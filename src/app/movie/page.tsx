'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'

export default function Movie() {
  const { movieList, fetchTrendMovie, fetchMovieGenres, onSearchMovie } =
    useMovieStore()
  const genreById = useMovieStore((state) => state.genreById())
  const [searchInput, setSearchInput] = useState('')

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = searchInput.trim()
    if (e.key === 'Enter' && input !== '') {
      onSearchMovie(input)
    }
  }

  useEffect(() => {
    fetchTrendMovie()
    fetchMovieGenres()
  }, [])

  return (
    <>
      <Title>The Movie Planet</Title>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
        repudiandae!
      </div>
      <div style={{ margin: '24px 0' }}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onSearch}
        />
      </div>
      {movieList.map((movie) => {
        const year = new Date(movie.release_date).getFullYear()
        return (
          <div key={movie.id}>
            <div>
              {movie.title} ({year}) - {movie.vote_average.toFixed(1)}/10
            </div>
            <div>{movie.genre_ids.map((id) => genreById[id]).join(', ')}</div>
            <Image
              src={getImgFullPath(movie.poster_path)}
              alt={movie.title}
              crossOrigin="anonymous"
              width={500 * 0.6}
              height={750 * 0.6}
              style={{ position: 'relative', objectFit: 'contain' }}
            />
          </div>
        )
      })}
    </>
  )
}

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 60px;
`
