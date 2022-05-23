import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from '@mui/material'
import Counter from 'components/counter/Counter'
import styles from 'styles/Home.module.css'

const MainPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>主頁</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello World</h1>
      <h2>哈囉 世界好</h2>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Counter />
    </div>
  )
}

export default MainPage
