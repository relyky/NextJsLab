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
        <Head />
        <body style={{ backgroundColor: '#f8f8f8' }}>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument