import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo2/dm2010/AppForm'

const DM2010Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM2010</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM2010Page
