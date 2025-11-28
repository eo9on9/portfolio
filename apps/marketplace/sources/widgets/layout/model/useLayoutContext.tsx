import { usePusher } from '@shared/hook/usePusher'
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
  const { newMessageEvent } = usePusher()
  const [newMessageCount, setNewMessageCount] = useState(0)

  useEffect(() => {
    if (newMessageEvent) {
      console.log('newMessageEvent', newMessageEvent)
      setNewMessageCount(newMessageEvent.data as number)
    }
  }, [newMessageEvent])

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
