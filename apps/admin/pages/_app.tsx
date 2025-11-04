import { App as AppComponent } from '@app/App'
import type { AppProps } from 'next/app'

import '@app/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppComponent>
      <Component {...pageProps} />
    </AppComponent>
  )
}
