export async function fetchCount(amount = 1): Promise<{ data: number }> {
  const response = await fetch('/api/counter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })
  const result = await response.json()

  return result
}


export async function qryDataList(args: object): Promise<object[]> {
  const resp = await fetch('/api/form09/qryDataList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  
  if (resp.status === 299) {
    const { errMsg } = await resp.json()
    throw new Error(errMsg)
  }

  if (resp.status !== 200) {
    const { status, statusText } = resp
    throw new Error(`${status} ${statusText}`)
  }

  // success
  const dataList = await resp.json()
  return dataList
}


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
