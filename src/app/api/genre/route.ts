import { NextRequest, NextResponse } from 'next/server'
import { getQueryString } from '@/lib/utils/helpers'
import movieMockData from './movieMockData.json'
import tvseriesMockData from './tvseriesMockData.json'

const isProd = process.env.NODE_ENV === 'production'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('lang') || 'en-US'
  const mediaType = searchParams.get('media') || 'movie'

  const PREFIX_URL = `https://api.themoviedb.org/3/genre/${mediaType}/list`

  const data = await (async () => {
    if (isProd) {
      const queryString = getQueryString({ language })
      const res = await fetch(`${PREFIX_URL}${queryString}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    }
    return mediaType === 'movie' ? movieMockData : tvseriesMockData
  })()

  return NextResponse.json({ data })
}
