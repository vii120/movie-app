import { NextResponse } from 'next/server'
import { getQueryString } from '@/lib/utils/helpers'
import { mockData } from './mockData'

const PREFIX_URL = 'https://api.themoviedb.org/3/search/movie'
const isProd = process.env.NODE_ENV === 'production'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const language = searchParams.get('lang') || 'en-US'
  const page = searchParams.get('page') || 1

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
    return mockData(Number(page))
  })()

  return NextResponse.json({ data })
}
