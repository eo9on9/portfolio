import { useEffect, useRef, useState } from 'react'

export const useStableLoading = (isLoading: boolean, delay = 300) => {
  const [isStableLoading, setIsStableLoading] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      // 로딩 시작 시각 기록
      if (timerRef.current === null) {
        timerRef.current = Date.now()
      }
      setIsStableLoading(true)
    } else {
      // 로딩 종료 시점에서 경과 시간 계산
      const elapsed = Date.now() - (timerRef.current ?? 0)
      const remain = Math.max(delay - elapsed, 0)

      const timer = setTimeout(() => {
        setIsStableLoading(false)
        timerRef.current = null
      }, remain)

      return () => clearTimeout(timer)
    }
  }, [isLoading, delay])

  return { isStableLoading }
}
