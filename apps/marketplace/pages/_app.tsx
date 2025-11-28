import { App as AppComponent } from '@app/ui/App'
import type { AppProps } from 'next/app'

import '@app/style/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppComponent>
      <Component {...pageProps} />
    </AppComponent>
  )
}
