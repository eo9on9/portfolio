import {
  Toast as PrimitiveToast,
  ToastDescription as PrimitiveToastDescription,
} from '@radix-ui/react-toast'
import { cn, cnMerge } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import { Frown, Info, Smile } from 'lucide-react'
import { ToastVariant } from './types'

interface ToastProps {
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
    success: <Smile className={cnMerge(iconTw, 'text-green-600')} />,
    error: <Frown className={cnMerge(iconTw, 'text-red-600')} />,
    default: <Info className={cnMerge(iconTw, 'text-gray-600')} />,
  }[variant]

  return (
    <PrimitiveToast
      open={isOpen}
      onOpenChange={setIsOpen}
      className={toastVariants({ variant })}
      duration={3000}
    >
      <PrimitiveToastDescription>
        <div className={descriptionTw}>
          <span>{Icon}</span>
          <span className={messageTw}>{message}</span>
        </div>
      </PrimitiveToastDescription>
    </PrimitiveToast>
  )
}

const toastVariants = cva(
  [
    'py-2 px-4 rounded-sm shadow-md',
    'data-[state=open]:animate-[toastIn_100ms_ease-out_forwards]',
    'data-[state=closed]:animate-[toastOut_100ms_ease-out_forwards]',
  ],
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

const iconTw = cn`size-5`

const descriptionTw = cn`flex items-center gap-2`

const messageTw = cn`text-sm font-medium text-gray-800`
