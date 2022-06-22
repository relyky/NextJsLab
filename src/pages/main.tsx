import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Container } from '@mui/material'
import Swal from 'sweetalert2'

const MainPage: NextPage = () => {

  async function connSqlServerTest() {

    const response = await checkSqlConn(3)
    const { message, err, dataList } = response

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
      </Container>
    </>
  )
}

export default MainPage

//============================
async function checkSqlConn(amount = 1): Promise<any> {
  const response = await fetch('/api/datahub', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })

  const result = await response.json()

  return result
}
