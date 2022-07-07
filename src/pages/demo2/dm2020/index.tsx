import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from 'views/demo2/dm2020/AppForm'

const DM2020Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM2020</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
    </>
  )
}

export default DM2020Page
