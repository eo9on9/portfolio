import { AppErrorFallback } from '@app/AppErrorFallback'
import { SSEProvider } from '@shared/api/useSSE'
import { ToastProvider } from '@shared/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NewMessageCountProvider } from '@widgets/layout/model/useNewMessageCount'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SSEProvider>
          <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <NewMessageCountProvider>{children}</NewMessageCountProvider>
          </ErrorBoundary>
        </SSEProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}
