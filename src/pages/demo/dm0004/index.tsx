import type { NextPage } from 'next'
import Head from 'next/head'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import AppForm from 'views/demo/dm0004/AppForm'

const DM0003Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>DM0004</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <AppForm />
      </DndProvider>
    </>
  )
}

export default DM0003Page