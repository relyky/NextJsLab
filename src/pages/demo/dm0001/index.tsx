import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo/dm0001/AppForm'

const DM0001Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0001</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM0001Page
