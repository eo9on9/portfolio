import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  isError?: boolean
}

export const Input = ({ icon, className, isError, ...props }: InputProps) => {
  return (
    <div className={containerVariants({ isError, readOnly: !!props.readOnly })}>
      {icon}
      <input
        className={cn(
          'flex-1 outline-none text-gray-800 placeholder:text-gray-400 read-only:text-gray-500 focus:ring-0',
          className,
        )}
        {...props}
      />
    </div>
  )
}

const containerVariants = cva(
  'inline-flex items-center gap-2 h-10 px-4 text-sm rounded-sm outline-1 focus-within:bg-white transition-outline duration-200 ease-out',
  {
    variants: {
      isError: {
        true: 'outline-error focus-within:outline-error',
        false: 'outline-transparent focus-within:outline-gray-300',
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
