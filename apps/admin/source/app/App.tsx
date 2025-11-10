import { ToastProvider } from '@shared/ui/Toast/useToast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  )
}

/** CSR test */
// export const App = ({ children }: PropsWithChildren) => {
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   if (!isClient) return null

//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   )
// }
