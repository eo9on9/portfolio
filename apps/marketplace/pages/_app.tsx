import { AppErrorFallback } from '@app/AppErrorFallback'
import { ToastProvider } from '@shared/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'

import '@app/globals.css'
import { SSEProvider } from '@shared/api/useSSE'
import { NewMessageCountProvider } from '@widgets/layout/model/useNewMessageCount'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SSEProvider>
          <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <NewMessageCountProvider>
              <Component {...pageProps} />
            </NewMessageCountProvider>
          </ErrorBoundary>
        </SSEProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}
