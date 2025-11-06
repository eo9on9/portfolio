import { cn } from '@shared/util/cn'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn('skeleton', className)} />
}
