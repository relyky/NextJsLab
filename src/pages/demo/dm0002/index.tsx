import type { NextPage } from 'next'
import Head from 'next/head'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import AppForm from 'views/demo/dm0002/AppForm'

const DM0002Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0002</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <AppForm />
      </DndProvider>
    </>
  )
}

export default DM0002Page