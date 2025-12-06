import { type PolymorphicComponentProps } from '@/types/polymorphic'
import { cnMerge } from '@/utils/cn'
import { ElementType } from 'react'

export type BadgeProps<T extends ElementType = 'span'> =
  PolymorphicComponentProps<T>

export const Badge = <T extends ElementType = 'span'>({
  as,
  className,
  ...props
}: BadgeProps<T>) => {
  const Component = (as ?? 'span') as ElementType

  return (
    <Component
      className={cnMerge(
        'inline-block w-fit px-2 py-0.5 font-pretendard text-xs font-medium text-gray-800 rounded-sm bg-white focus-visible-ring',
        className,
      )}
      {...props}
    />
  )
}
