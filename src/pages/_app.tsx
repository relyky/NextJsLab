import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'
import store from 'store/store'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhTW } from '@mui/material/locale'
//import Navbar from 'components/navbar/Navbar'
import Banner from 'components/Banner'
import Overlay from 'views/Overlay'
// CSS
import 'styles/globals.css'
import 'animate.css'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Banner />
          <main>
            <Component {...pageProps} />
          </main>
          <Overlay />
        </ThemeProvider>
      </Provider>
    </>
  )
}
