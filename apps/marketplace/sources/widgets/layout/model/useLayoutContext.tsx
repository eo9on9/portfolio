import { useSSE } from '@shared/api/useSSE'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

interface LayoutContextValue {
  newMessageCount: number
}

const LayoutContext = createContext<LayoutContextValue>({
  newMessageCount: 0,
})

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const { event } = useSSE()
  const [newMessageCount, setNewMessageCount] = useState(0)

  useEffect(() => {
    if (event?.type === 'new-message-count') {
      setNewMessageCount(event.payload as number)
    }
  }, [event])

  return (
    <LayoutContext.Provider value={{ newMessageCount }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error(
      'useNewMessageCount must be used within a NewMessageCountProvider',
    )
  }

  return context
}
