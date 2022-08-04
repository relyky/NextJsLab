import Head from 'next/head'
// 註冊頁面
import DM2010Page from 'views/demo2/dm2010/AppForm'
import DM2020Page from 'views/demo2/dm2020/AppForm'
import DM2030Page from 'views/demo2/dm2030/AppForm'

/// 參考：[Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)
export default function DynamicRoutes(props) {
  const { area, pageId } = props

  // 取得標的註冊頁面
  const TargetPage 
    = (area === 'demo2' && pageId === 'dm2010') ? DM2010Page
    : (area === 'demo2' && pageId === 'dm2020') ? DM2020Page
    : (area === 'demo2' && pageId === 'dm2030') ? DM2030Page
    : ()=>(<p>the target page is not registered.</p>);

  return (
    <>
      <Head>
        <title>{pageId}</title>
      </Head>
      <TargetPage {...props} />
    </>
  )
}

///----------------------------------------------------------------------------
/// SSR mode
export async function getServerSideProps(context) {
  // 參考：[getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)
  // const { req, res, params, query } = context // 解析 request URL

  const { params: { area, pageId } } = context
  console.log('getServerSideProps', { area, pageId })

  // 檢查授權等, 先預設失敗
  let notFound = true
  let notAuthz = true

  // 假設已取得授權
  notAuthz = false

  if (area === 'demo2' && ['dm2010', 'dm2020', 'dm2030'].includes(pageId)) {
    notFound = false
  }

  if (notAuthz) {
    // will goto 401 page
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  if (notFound) {
    // will goto 404 page
    return { notFound: true }
  }

  return {
    props: { area, pageId }
  }
}
