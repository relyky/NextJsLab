import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { getInitColorSchemeScript } from '@mui/material/styles'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html lang="zh-Hant">
        <Head>
          {/* 必需在 _document 指定預設字體 */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>

          {/* § Server-side rendering 
          To prevent the dark-mode SSR flickering during the hydration phase, 
          place getInitColorSchemeScript() before the <Main /> tag. 
          https://mui.com/material-ui/experimental-api/css-variables/#server-side-rendering */}
          {getInitColorSchemeScript()}

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument