import type { NextPage } from 'next'
import Head from 'next/head'

import Counter from 'components/counter/Counter'
import styles from 'styles/Home.module.css'

const DM0003Page: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DM0003</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>DM0003</h1>
      <h2>哈囉 世界好</h2>
      <Counter />
    </div>
  )
}

export default DM0003Page
