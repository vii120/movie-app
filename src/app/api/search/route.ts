import { NextRequest, NextResponse } from 'next/server'
import { getQueryString } from '@/lib/utils/helpers'
import { movieMockData } from './movieMockData'
import { tvseriesMockData } from './tvseriesMockData'

const isProd = process.env.NODE_ENV === 'production'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const language = searchParams.get('lang') || 'en-US'
  const page = searchParams.get('page') || 1
  const mediaType = searchParams.get('media') || 'all'

  const PREFIX_URL = `https://api.themoviedb.org/3/search/${mediaType}`

  const data = await (async () => {
    if (isProd) {
      const queryString = getQueryString({ query, language, page })
      const res = await fetch(`${PREFIX_URL}${queryString}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    }
    return mediaType === 'movie'
      ? movieMockData(Number(page))
      : tvseriesMockData(Number(page))
  })()

  return NextResponse.json({ data })
}
