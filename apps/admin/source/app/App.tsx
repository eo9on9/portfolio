import { GuideModal } from '@app/GuideModal'
import { ToastProvider } from '@repo/ui-common'
import { alreadySeenGuideStorage } from '@shared/store/alreadySeenGuideStorage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LayoutProvider } from '@widgets/layout/model/useLayout'
import Head from 'next/head'
import { PropsWithChildren, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AppErrorFallback } from './AppErrorFallback'

const queryClient = new QueryClient()

export const App = ({ children }: PropsWithChildren) => {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(
    !alreadySeenGuideStorage.get(),
  )

  return (
    <>
      <Head>
        <title>관리자 시스템</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <ToastProvider>
            <LayoutProvider>
              {children}
              <GuideModal
                open={isGuideModalOpen}
                onClose={() => {
                  setIsGuideModalOpen(false)
                  alreadySeenGuideStorage.set(true)
                }}
              />
            </LayoutProvider>
          </ToastProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  )
}
