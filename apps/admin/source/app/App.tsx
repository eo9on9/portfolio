import { ToastProvider } from '@shared/ui/Toast/useToast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AppErrorFallback } from './AppErrorFallback'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          {children}
        </ErrorBoundary>
      </ToastProvider>
    </QueryClientProvider>
  )
}
