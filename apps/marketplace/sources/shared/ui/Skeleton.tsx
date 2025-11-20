import { cn, cnMerge } from '@shared/util/cn'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cnMerge(skeletonTw, className)} />
}

const skeletonTw = cn([
  /** base */
  'inline-block w-full rounded-md bg-[linear-gradient(100deg,var(--color-gray-100)_40%,var(--color-gray-50)_50%,var(--color-gray-100)_60%)] bg-size-[200%_100%]',
  /** animation */
  'animate-[shimmer_2s_infinite_linear]',
])
