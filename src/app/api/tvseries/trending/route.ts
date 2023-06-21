import { NextRequest, NextResponse } from 'next/server'
import { getQueryString } from '@/lib/utils/helpers'
import { mockData } from './mockData'

const PREFIX_URL = 'https://api.themoviedb.org/3/trending/tv'
const isProd = process.env.NODE_ENV === 'production'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'week'
  const language = searchParams.get('lang') || 'en-US'
  const page = searchParams.get('page') || 1

  const data = await (async () => {
    if (isProd) {
      const queryString = getQueryString({ language, page })
      const res = await fetch(`${PREFIX_URL}/${type}${queryString}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    }
    return mockData(Number(page))
  })()

  return NextResponse.json({ data })
}
