'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
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
      <div>
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
