import {
  ToastProvider as PrimitiveToastProvider,
  ToastViewport as PrimitiveToastViewport,
} from '@radix-ui/react-toast'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react'
import { Toast } from './Toast'
import { ToastVariant } from './types'

interface ToastContextValue {
  setIsOpen: (isOpen: boolean) => void
  setMessage: (message: string) => void
  setVariant: (variant: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue>({
  setIsOpen: () => {},
  setMessage: () => {},
  setVariant: () => {},
})

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<ToastVariant>('default')

  return (
    <PrimitiveToastProvider>
      <ToastContext.Provider value={{ setIsOpen, setMessage, setVariant }}>
        {children}
      </ToastContext.Provider>
      <Toast
        message={message}
        variant={variant}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PrimitiveToastViewport className="fixed bottom-0 right-0 p-4" />
    </PrimitiveToastProvider>
  )
}

export const useToast = () => {
  const { setIsOpen, setMessage, setVariant } = useContext(ToastContext)

  const timer = useRef<NodeJS.Timeout | null>(null)

  const _toast = (message: string, variant: ToastVariant = 'default') => {
    setIsOpen(false)
    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setMessage(message)
      setVariant(variant)
      setIsOpen(true)
    }, 100)
  }

  return {
    success: (message: string) => _toast(message, 'success'),
    error: (message: string) => _toast(message, 'error'),
    default: (message: string) => _toast(message, 'default'),
  }
}
