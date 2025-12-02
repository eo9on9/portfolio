import { PolymorphicComponentProps } from '@/types/polymorphic'
import { cnMerge } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { ElementType } from 'react'

interface ButtonCustomProps {
  variant?: 'primary'
  size?: 'md'
  isLoading?: boolean
}

export type ButtonProps<T extends ElementType = 'button'> =
  PolymorphicComponentProps<T, ButtonCustomProps>

export const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps<T>) => {
  const Component = (as ?? 'button') as ElementType

  return (
    <Component
      className={cnMerge(
        buttonVariants({ variant, size, disabled: props.disabled }),
        className,
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      <span className={textWrapVariants({ isLoading })}>{children}</span>
      {isLoading && (
        <LoaderCircle
          className="absolute inset-0 m-auto size-4 animate-spin"
          aria-label="now loading"
        />
      )}
    </Component>
  )
}

const buttonVariants = cva(
  'relative inline-block font-medium text-sm rounded-sm transition-bg duration-200 ease-out focus-visible-ring font-pretendard',
  {
    variants: {
      variant: {
        primary: 'bg-gray-800 text-white not-disabled:hover:bg-gray-700',
        secondary:
          'text-gray-800 border border-gray-300 bg-white not-disabled:hover:bg-gray-100',
        ghost: 'bg-transparent text-gray-800 not-disabled:hover:bg-gray-100',
      },
      size: {
        md: 'h-8 px-2.5',
        lg: 'h-9 px-3',
      },
      disabled: {
        true: 'opacity-30',
      },
    },
  },
)

const textWrapVariants = cva('flex items-center justify-center gap-2 h-full', {
  variants: {
    isLoading: {
      true: 'opacity-0',
      false: 'opacity-100',
    },
  },
})
