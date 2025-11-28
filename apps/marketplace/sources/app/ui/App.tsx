import { AppErrorFallback } from '@app/ui/AppErrorFallback'
import { Guide } from '@app/ui/Guide'
import { PusherProvider } from '@shared/hook/usePusher'
import { ToastProvider } from '@shared/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>아이템 거래소</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <PusherProvider>
            <ErrorBoundary FallbackComponent={AppErrorFallback}>
              {children}
              <Guide />
            </ErrorBoundary>
          </PusherProvider>
        </ToastProvider>
      </QueryClientProvider>
    </>
  )
}
