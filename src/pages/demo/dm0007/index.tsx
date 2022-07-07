import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo/dm0007/AppForm'

const DM0007Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0007: react-spring Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM0007Page
