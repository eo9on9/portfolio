import { AppErrorFallback } from '@app/AppErrorFallback'
import { Guide } from '@app/Guide'
import { PusherProvider } from '@shared/hook/usePusher'
import { ToastProvider } from '@shared/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LayoutProvider } from '@widgets/layout/model/useLayoutContext'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <PusherProvider>
          <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <LayoutProvider>
              {children}
              <Guide />
            </LayoutProvider>
          </ErrorBoundary>
        </PusherProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}
