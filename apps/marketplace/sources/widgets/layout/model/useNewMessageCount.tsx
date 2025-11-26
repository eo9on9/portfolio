import { useSSE } from '@shared/api/useSSE'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

interface NewMessageCountContextValue {
  count: number
}

const NewMessageCountContext = createContext<NewMessageCountContextValue>({
  count: 0,
})

export const NewMessageCountProvider = ({ children }: PropsWithChildren) => {
  const { event } = useSSE()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (event?.type === 'new-message-count') {
      setCount(event.payload as number)
    }
  }, [event])

  return (
    <NewMessageCountContext.Provider value={{ count }}>
      {children}
    </NewMessageCountContext.Provider>
  )
}

export const useNewMessageCount = () => {
  const context = useContext(NewMessageCountContext)

  if (!context) {
    throw new Error(
      'useNewMessageCount must be used within a NewMessageCountProvider',
    )
  }

  return context
}
