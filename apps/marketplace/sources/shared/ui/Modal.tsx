import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Button } from './Button'

interface ModalProps {
  title: string
  open: boolean
  onClose?: () => void
}

export const Modal = ({
  title,
  open,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  const [isCreated, setIsCreated] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)

    if (open) {
      setIsCreated(true)

      timer.current = setTimeout(() => {
        setIsShow(true)
      }, 10)
    } else {
      if (timer.current) clearTimeout(timer.current)

      setIsShow(false)

      timer.current = setTimeout(() => {
        setIsCreated(false)
      }, 200)
    }
  }, [open])

  return (
    <Dialog open={isCreated} onOpenChange={onClose}>
      <DialogPortal>
        <div className={containerTw}>
          <DialogOverlay className={dimVariants({ isShow })} />
          <DialogContent className={contentVariants({ isShow })}>
            <div className={headTw}>
              <DialogTitle asChild>
                <h3 className={titleTw}>{title}</h3>
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="md">
                  <X className={xTw} />
                </Button>
              </DialogClose>
            </div>
            <DialogDescription asChild>
              <div>{children}</div>
            </DialogDescription>
          </DialogContent>
        </div>
      </DialogPortal>
    </Dialog>
  )
}

const containerTw = cn`z-100 fixed inset-0 flex items-center justify-center`

const headTw = cn`flex items-center justify-between`

const titleTw = cn`text-lg font-semibold text-gray-800`

const xTw = cn`size-4 text-gray-500`

const dimVariants = cva(
  cn`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out`,
  {
    variants: {
      isShow: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  },
)

const contentVariants = cva(
  cn`p-6 relative w-lg bg-white rounded-sm shadow-md transition-all duration-200 ease-out`,
  {
    variants: {
      isShow: {
        true: 'opacity-100 scale-100',
        false: 'opacity-0 scale-95',
      },
    },
  },
)
