import { cn, cnMerge } from '@shared/util/cn'
import { cva } from 'class-variance-authority'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  isError?: boolean
}

export const Input = ({ icon, className, isError, ...props }: InputProps) => {
  return (
    <div className={containerVariants({ isError, readOnly: !!props.readOnly })}>
      {icon}
      <input className={cnMerge(inputTw, className)} {...props} />
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

const inputTw = cn`flex-1 outline-none text-gray-800 placeholder:text-gray-400 read-only:text-gray-500 focus:ring-0`
