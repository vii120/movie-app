import { IMG_URL_PREFIX } from './constants'

export const getQueryString = (obj: Record<any, any>) => {
  if (!Object.keys(obj).length) return ''
  const query = Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  return `?${query.join('&')}`
}

export const getImgFullPath = (path: string) => {
  return `${IMG_URL_PREFIX}${path}`
}
