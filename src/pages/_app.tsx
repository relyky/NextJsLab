import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../app/store'
import Navbar from 'components/navbar/Navbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
