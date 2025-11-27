import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface SSEEvent {
  type: string
  payload: unknown
  createdAt: number
}

interface SSEContextValue {
  event: SSEEvent | null
}

const SSEContext = createContext<SSEContextValue>({ event: null })

export const SSEProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<SSEEvent | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!eventSourceRef.current) {
      eventSourceRef.current = new EventSource('/api/sse')

      eventSourceRef.current.onmessage = ev => {
        try {
          setEvent(JSON.parse(ev.data))
        } catch (e) {
          console.error('Failed to parse SSE event:', e)
        }
      }

      eventSourceRef.current.onerror = e => {
        console.error('SSE error:', e)
      }
    }

    return () => {
      eventSourceRef.current?.close()
    }
  }, [])

  return <SSEContext.Provider value={{ event }}>{children}</SSEContext.Provider>
}

export const useSSE = () => {
  const ctx = useContext(SSEContext)
  if (!ctx) throw new Error('useSSE must be used inside <SSEProvider>')
  return ctx
}
