import { getInit } from '@app/api/getInit'
import Pusher from 'pusher-js'
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
  const [newMessageCount, setNewMessageCount] = useState(0)

  useEffect(() => {
    const pusher = new Pusher('f91108b021151316d7d9', {
      cluster: 'ap3',
    })

    const channel = pusher.subscribe('new-message-count')

    channel.bind('new-message-count', (data: { payload: number }) => {
      setNewMessageCount(data.payload)
    })

    channel.bind('pusher:subscription_succeeded', () => {
      console.log('pusher:subscription_succeeded')
      getInit()
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [])

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
