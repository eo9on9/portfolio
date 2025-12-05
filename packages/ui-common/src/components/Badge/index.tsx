import { PolymorphicComponentProps } from '@/types/polymorphic'
import { cnMerge } from '@/utils/cn'

export const Badge = ({
  className,
  ...props
}: PolymorphicComponentProps<'span'>) => {
  return (
    <span
      className={cnMerge(
        'inline-block w-fit px-2 py-0.5 text-xs font-medium text-gray-800 rounded-sm bg-white',
        className,
      )}
      {...props}
    />
  )
}
