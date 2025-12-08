import { cnMerge } from '@/utils/cn'
import {
  Toast as PrimitiveToast,
  ToastDescription as PrimitiveToastDescription,
} from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { Frown, Info, Smile } from 'lucide-react'
import { ToastVariant } from './types'

export interface ToastProps {
  variant?: ToastVariant
  message?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const Toast = ({
  variant = 'default',
  message,
  isOpen,
  setIsOpen,
}: ToastProps) => {
  const Icon = {
    success: <Smile className={cnMerge('size-5', 'text-green-600')} />,
    error: <Frown className={cnMerge('size-5', 'text-red-600')} />,
    default: <Info className={cnMerge('size-5', 'text-gray-600')} />,
  }[variant]

  return (
    <PrimitiveToast
      open={isOpen}
      onOpenChange={setIsOpen}
      className={toastVariants({ variant })}
      duration={3000}
    >
      <PrimitiveToastDescription>
        <div className="flex items-center gap-2">
          <span>{Icon}</span>
          <span className="font-pretendard text-sm font-medium text-gray-800">
            {message}
          </span>
        </div>
      </PrimitiveToastDescription>
    </PrimitiveToast>
  )
}

const toastVariants = cva(
  'py-2 px-4 rounded-sm shadow-md data-[state=open]:animate-[toastIn_100ms_ease-out_forwards] data-[state=closed]:animate-[toastOut_100ms_ease-out_forwards]',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        success: 'bg-green-100',
        error: 'bg-red-100',
      },
    },
  },
)
