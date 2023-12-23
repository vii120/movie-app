'use client'

import { useEffect, useMemo } from 'react'
import { useTvseriesStore } from '@/lib/store'
import { PageLayout } from '@/components/PageLayout'

export default function Tvseries() {
  const {
    tvseriesList,
    tvseriesSearchList,
    tvseriesGenres,
    fetchTrendingTvseries,
    fetchTvseriesGenres,
    onSearchTvseries,
  } = useTvseriesStore()

  const list = useMemo(() => {
    if (tvseriesSearchList?.length) {
      return tvseriesSearchList
    }
    return tvseriesList
  }, [tvseriesList, tvseriesSearchList])

  useEffect(() => {
    fetchTrendingTvseries()
    fetchTvseriesGenres()
  }, [])

  return (
    <PageLayout
      list={list.map((movie) => ({
        id: movie.id,
        name: movie.name,
        date: movie.first_air_date,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
      }))}
      genres={tvseriesGenres}
      onSearch={onSearchTvseries}
    />
  )
}
