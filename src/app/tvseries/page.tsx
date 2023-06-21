'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useTvseriesStore } from '@/lib/store'
import { getImgFullPath } from '@/lib/utils/helpers'

export default function Movie() {
  const {
    tvseriesList,
    fetchTrendingTvseries,
    fetchTvseriesGenres,
    onSearchTvseries,
  } = useTvseriesStore()
  const genreById = useTvseriesStore((state) => state.genreById())

  useEffect(() => {
    fetchTrendingTvseries()
    fetchTvseriesGenres()
  }, [])

  return (
    <>
      {tvseriesList.map((movie) => {
        const year = new Date(movie.first_air_date).getFullYear()
        return (
          <div key={movie.id}>
            <div>
              {movie.name} ({year}) - {movie.vote_average.toFixed(1)}/10
            </div>
            <div>{movie.genre_ids.map((id) => genreById[id]).join(', ')}</div>
            <Image
              src={getImgFullPath(movie.poster_path)}
              alt={movie.name}
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
