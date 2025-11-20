import { ToastProvider } from '@shared/ui/Toast'
import type { AppProps } from 'next/app'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}
