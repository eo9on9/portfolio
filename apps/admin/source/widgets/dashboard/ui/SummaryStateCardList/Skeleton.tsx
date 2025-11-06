import { Skeleton as SkeletonUI } from '@shared/ui/Skeleton'

export const Skeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <SkeletonUI className="h-[126px]" />
      <SkeletonUI className="h-[126px]" />
      <SkeletonUI className="h-[126px]" />
      <SkeletonUI className="h-[126px]" />
    </div>
  )
}
