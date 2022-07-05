import type { NextPage } from 'next'
import Head from 'next/head'
import AppForm from './AppForm'
import { Backdrop, CircularProgress } from '@mui/material'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'

const DM0009Page: NextPage = () => {
  const { blocking } = useAppSelector(store => store.metaData) 
  return (
    <>
      <Head>
        <title>DM0009</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={blocking}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default DM0009Page
