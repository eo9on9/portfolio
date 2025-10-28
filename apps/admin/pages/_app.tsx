import { App as AppComponent } from '@/source/app/App'
import type { AppProps } from 'next/app'

import '@/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppComponent>
      <Component {...pageProps} />
    </AppComponent>
  )
}
