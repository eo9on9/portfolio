import { cn } from '@/source/shared/util/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const Input = ({ icon, className, ...props }: InputProps) => {
  return (
    <div className="inline-flex items-center gap-2 h-10 px-4 text-sm bg-gray-100 rounded-sm focus-within:outline-1 focus-within:outline-gray-800">
      {icon}
      <input
        className={cn(
          'flex-1 outline-none text-gray-800 placeholder:text-gray-400',
          className,
        )}
        {...props}
      />
    </div>
  )
}
