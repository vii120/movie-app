'use client'
import { useEffect } from 'react'
import { useUserStore } from '@/lib/store'
import { register } from 'swiper/element/bundle'
import 'swiper/swiper.min.css'
register()

export default function Providers({ children }: { children: React.ReactNode }) {
  // const { updateLang } = useUserStore()
  // const isInit = useUserStore((state) => state.isInit())

  // useEffect(() => {
  //   updateLang(navigator?.language ?? '')
  // }, [])

  return <>{children}</>
}
