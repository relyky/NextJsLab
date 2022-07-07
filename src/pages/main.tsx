import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Container } from '@mui/material'
import swal from 'sweetalert2'

const MainPage: NextPage<{
  env: object
}> = (props) => {

  async function connSqlServerTest() {

    const result = await checkSqlConn(3)
    const { message, err, dataList } = result

    console.log('connSqlServerTest', { message, err, dataList })

    if (err) {
      swal.fire({
        title: '測試 SQL Server 連線失敗',
        icon: 'error'
      })
    }
    else {
      swal.fire({
        title: '測試 SQL Server 連線',
        text: message,
        icon: 'info'
      })
    }

  }

  async function handleFormAction() {

    const result = await getFormData('OP2022123')

    swal.fire({
      title: '回應訊息',
      text: JSON.stringify(result),
      icon: 'info'
    })
  }

  return (
    <>
      <Head>
        <title>主頁</title>
      </Head>
      <Container>
        <h1>Hello World <small>哈囉 世界好</small></h1>

        <hr />
        <h2>環境參數</h2>
        <pre>
          {JSON.stringify(props.env, null, ' ')}
        </pre>

        <Button variant="contained" color="primary" onClick={connSqlServerTest}>
          測試 SQL Server 連線
        </Button>

        <Button variant="contained" color="primary" onClick={handleFormAction}>
          測試 SQL Server 連線
        </Button>

      </Container>
    </>
  )
}

export default MainPage

///----------------------------------------------------------------------------
/// 特殊函式: 只會在 Server 端執行。
/// will be passed to the page component as props
export async function getServerSideProps(context) {
  return {
    props: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME
      }
    }
  }
}

//=============================================================================
// apiClient
async function checkSqlConn(amount = 1): Promise<any> {
  const res = await fetch('/api/datahub', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })

  if (res.status !== 200) {
    const { status, statusText } = res
    return { status, statusText }
  }

  // success
  const result = await res.json()
  return result
}

async function getFormData(formNo: string): Promise<any> {
  const res = await fetch('/api/form01/getFormData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formNo }),
  })

  if (res.status !== 200) {
    const { status, statusText } = res
    return { status, statusText }
  }

  // success
  const result = await res.json()
  return result
}
