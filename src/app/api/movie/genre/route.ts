import { NextResponse } from 'next/server'
import mockData from './mockData.json'

const PREFIX_URL = 'https://api.themoviedb.org/3/genre/movie/list'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'en-US'

  // const res = await fetch(`${PREFIX_URL}?language=${lang}`, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const data = await res.json();

  const data = mockData

  return NextResponse.json({ data })
}
