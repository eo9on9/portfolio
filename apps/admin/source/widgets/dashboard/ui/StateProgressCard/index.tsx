import { Suspense } from 'react'
import { Core } from './Core'
import { Skeleton } from './Skeleton'

export const StateProgressCard = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Core />
    </Suspense>
  )
}
