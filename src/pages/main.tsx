import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Container } from '@mui/material'
import Swal from 'sweetalert2'

const MainPage: NextPage = () => {

  async function connSqlServerTest() {

    const result = await checkSqlConn(3)
    const { message, err, dataList } = result

    console.log('connSqlServerTest', { message, err, dataList })

    if (err) {
      Swal.fire({
        title: '測試 SQL Server 連線失敗',
        icon: 'error'
      })
    }
    else {
      Swal.fire({
        title: '測試 SQL Server 連線',
        text: message,
        icon: 'info'
      })
    }

  }

  async function handleFormAction() {

    const result = await getFormData('OP2022123')

    Swal.fire({
      title: '回應訊息',
      text: JSON.stringify(result),
      icon: 'info'
    })
  }

  return (
    <>
      <Head>
        <title>主頁</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Hello World</h1>
        <h2>哈囉 世界好</h2>
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

//============================
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
