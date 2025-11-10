import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { PropsWithChildren } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  onClick?: () => void
  className?: string
  disabled?: boolean
  isLoading?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  disabled,
  isLoading,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled }), className)}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : children}
    </button>
  )
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium text-sm rounded-sm cursor-pointer transition-bg duration-200 ease-out',
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
        true: 'opacity-30 cursor-auto',
      },
    },
  },
)
