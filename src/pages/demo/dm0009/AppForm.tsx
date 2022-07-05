import { Container, Paper, Box, Checkbox, FormControlLabel, Divider } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { H3, P1, AButton } from 'components/highorder'
// hooks
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import * as api from './apiThunk'

export default (props) => {
  const [args, setArgs] = useState({ simsFail: false });
  const { dataList } = useAppSelector(store => store.dm0009)
  const dispatch = useAppDispatch()

  return (
    <Container>
      <H3>DM0009: 存取 SQL Server</H3>
      <P1>存取 SQL Server CRUD練習。</P1>

      <Divider sx={{ my: 3 }} />

      <FormControlLabel label="模擬失敗" control={
        <Checkbox checked={args.simsFail} onChange={(_, chk) => setArgs({ simsFail: chk })} />
      } />

      <AButton mutant="primary" label="查詢D" onClick={() => dispatch(api.qryDataList(args))} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Unit ID</TableCell>
              <TableCell>Unit Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((item, index) => (
              <TableRow key={index}>
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
