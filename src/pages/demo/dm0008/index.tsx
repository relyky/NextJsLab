import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo/dm0008/AppForm'

const DM0008Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0008</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM0008Page
