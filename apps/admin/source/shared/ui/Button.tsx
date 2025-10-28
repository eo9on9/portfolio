import { cva } from 'class-variance-authority'

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({
  variant,
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  return <button className={buttonVariants({ variant })}>{children}</button>
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 h-10 px-4 font-medium text-sm rounded-sm cursor-pointer transition-bg duration-200 ease-out',
  {
    variants: {
      variant: {
        primary: 'bg-gray-800 text-white hover:bg-gray-700',
        secondary:
          'bg-white text-gray-800 border border-gray-800 hover:bg-gray-100',
        ghost: 'bg-transparent text-gray-800 hover:bg-gray-100',
      },
    },
  },
)
