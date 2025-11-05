import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  isError?: boolean
}

export const Input = ({ icon, className, isError, ...props }: InputProps) => {
  return (
    <div className={containerVariants({ isError })}>
      {icon}
      <input
        className={cn(
          'flex-1 outline-none text-gray-800 placeholder:text-gray-400 read-only:text-gray-500',
          className,
        )}
        {...props}
      />
    </div>
  )
}

const containerVariants = cva(
  'inline-flex items-center gap-2 h-10 px-4 text-sm bg-gray-100 rounded-sm outline-1 focus-within:bg-white transition-outline duration-200 ease-out has-read-only:bg-white',
  {
    variants: {
      isError: {
        true: 'outline-red-400 focus-within:outline-red-400',
        false: 'outline-transparent focus-within:outline-gray-300',
      },
    },
    defaultVariants: {
      isError: false,
    },
  },
)
