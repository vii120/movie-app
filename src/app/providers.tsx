'use client'
import { useEffect } from 'react'
import { useUserStore } from '@/lib/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  const { updateLang } = useUserStore()
  const isInit = useUserStore((state) => state.isInit())

  useEffect(() => {
    updateLang(navigator?.language ?? '')
  }, [])

  return <>{isInit ? children : null}</>
}
