import { AppErrorFallback } from '@app/AppErrorFallback'
import { ToastProvider } from '@shared/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'

import '@app/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ToastProvider>
    </QueryClientProvider>
  )
}
