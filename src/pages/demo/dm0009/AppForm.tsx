import type { SecUnit } from 'pages/api/form09/interfaces'
import { useState } from 'react'
import { Container, Paper, Box, Checkbox, FormControlLabel, Divider } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import swal from 'sweetalert2'
import { H3, P1, AButton } from 'components/highorder'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
//
import * as api from './apiClient'

import ss from './AppForm.module.css'


//import styles from 'styles/Home.module.css'

export default (props) => {
  const [args, setArgs] = useState({ simsFail: false });
  const [dataList, setDataList] = useState<SecUnit[]>([])

  async function doQryDataList() {
    try {
      const dataList = await api.qryDataList(args) as SecUnit[]
      setDataList(dataList)
    }
    catch (err) {
      swal.fire('出現錯誤',  err.message, 'error')
    }
  }

  return (
    <Container>
      <H3>DM0009: 存取 SQL Server</H3>
      <P1>存取 SQL Server CRUD練習。</P1>

      <Divider sx={{ my: 3 }} />

      <FormControlLabel label="模擬失敗" control={
        <Checkbox checked={args.simsFail} onChange={(_, chk) => setArgs({ simsFail: chk })} />
      } />

      <AButton mutant="primary" label="查詢" onClick={doQryDataList} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Unit ID</TableCell>
              <TableCell>Unit Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((item, index) => (
              <TableRow key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{item.unitId}</TableCell>
                <TableCell>{item.unitName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  )
}
