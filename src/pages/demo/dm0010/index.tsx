import type { NextPage } from 'next'
import type { Commodity } from './interfaces'
import Head from 'next/head'
import AppForm from './AppForm'
import { qryCommodityList } from './bizLogic'

const DM0010Page: NextPage<{
  commodityList: Commodity[]
}> = (props) => {
  return (
    <>
      <Head>
        <title>DM0010</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppForm {...props} />
    </>
  )
}

export default DM0010Page

///----------------------------------------------------------------------------
/// SSR mode
export async function getServerSideProps(context) {
  // 解析URL Query參數：http://localhost:3000/demo/dm0010?category=運動
  const { query: { category } } = context
  const commodityList = qryCommodityList(category)
  return {
    props: {
      commodityList
    }
  }
}
