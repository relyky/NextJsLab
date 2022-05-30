import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from './AppForm'

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
