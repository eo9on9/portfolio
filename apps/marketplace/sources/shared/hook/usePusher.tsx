import { getInit } from '@app/api/getInit'
import Pusher from 'pusher-js'
import { createContext, useContext, useEffect, useState } from 'react'

interface PusherEvent {
  name: string
  data: unknown
}

interface PusherContextValue {
  autoReplyEvent: PusherEvent | null
  newMessageEvent: PusherEvent | null
}

const PusherContext = createContext<PusherContextValue>({
  autoReplyEvent: null,
  newMessageEvent: null,
})

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
  const [autoReplyEvent, setAutoReplyEvent] = useState<PusherEvent | null>(null)
  const [newMessageEvent, setNewMessageEvent] = useState<PusherEvent | null>(
    null,
  )

  useEffect(() => {
    const pusher = new Pusher('f91108b021151316d7d9', {
      cluster: 'ap3',
    })

    const channel = pusher.subscribe('marketplace')

    channel.bind('auto-reply', (data: { payload: string }) => {
      setAutoReplyEvent({ name: 'auto-reply', data: data.payload })
    })

    channel.bind('new-message-count', (data: { payload: number }) => {
      setNewMessageEvent({ name: 'new-message-count', data: data.payload })
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
    <PusherContext.Provider value={{ autoReplyEvent, newMessageEvent }}>
      {children}
    </PusherContext.Provider>
  )
}

export const usePusher = () => {
  const context = useContext(PusherContext)

  if (!context) {
    throw new Error('usePusher must be used inside <PusherProvider>')
  }

  return context
}
