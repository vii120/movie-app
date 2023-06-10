'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMovieStore } from '@/lib/store'

export default function Movie() {
  const { movieList, fetchTrendMovie, fetchMovieGenres } = useMovieStore()
  const genreById = useMovieStore((state) => state.genreById())

  useEffect(() => {
    fetchTrendMovie()
    fetchMovieGenres()
  }, [])

  return (
    <>
      {movieList.map((movie) => (
        <div key={movie.id}>
          <div>
            {movie.title} ({movie.id}) - {movie.vote_average.toFixed(1)}/10
          </div>
          <div>{movie.genre_ids.map((id) => genreById[id]).join(', ')}</div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            crossOrigin="anonymous"
            width={500 * 0.6}
            height={750 * 0.6}
            style={{ position: 'relative', objectFit: 'contain' }}
          />
        </div>
      ))}
    </>
  )
}
