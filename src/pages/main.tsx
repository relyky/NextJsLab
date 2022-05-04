import type { NextPage } from 'next'
import Head from 'next/head'

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
      <Counter />
    </div>
  )
}

export default MainPage
