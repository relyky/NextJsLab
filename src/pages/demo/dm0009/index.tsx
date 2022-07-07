import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo/dm0009/AppForm'

const DM0009Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0009</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM0009Page
