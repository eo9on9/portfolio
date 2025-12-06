import { cnMerge } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

interface InputCustomProps {
  icon?: ReactNode
  isError?: boolean
}

export type InputProps = InputCustomProps &
  Omit<ComponentPropsWithRef<'input'>, keyof InputCustomProps>

export const Input = ({ icon, className, isError, ...props }: InputProps) => {
  return (
    <div className={containerVariants({ isError, readOnly: !!props.readOnly })}>
      {icon}
      <input
        className={cnMerge(
          'flex-1 outline-none font-pretendard text-gray-800 placeholder:text-gray-400 read-only:text-gray-500 focus:ring-0',
          className,
        )}
        aria-invalid={isError}
        {...props}
      />
    </div>
  )
}

const containerVariants = cva(
  'inline-flex items-center gap-2 h-10 px-4 text-sm rounded-sm border focus-within:bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300 transition-border duration-200 ease-out',
  {
    variants: {
      isError: {
        true: 'border-error focus-within:border-error',
        false: 'border-transparent focus-within:border-gray-300',
      },
      readOnly: {
        true: 'bg-white',
        false: 'bg-gray-100 focus-within:bg-white',
      },
    },
    defaultVariants: {
      isError: false,
    },
  },
)
