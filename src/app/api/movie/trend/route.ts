import { NextResponse } from 'next/server'
import { mockData } from './mockData'

const PREFIX_URL = 'https://api.themoviedb.org/3/trending/movie'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'week'
  const lang = searchParams.get('lang') || 'en-US'
  const page = searchParams.get('page') || 1
  console.log({ type, lang, page })

  // const res = await fetch(
  //   `${PREFIX_URL}/${type}?language=${lang}&page=${page}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // const data = await res.json();
  const data = mockData(Number(page))

  return NextResponse.json({ data })
}
