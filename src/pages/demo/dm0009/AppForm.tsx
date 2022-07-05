import { useState } from 'react'
import { Container, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material'
import swal from 'sweetalert2'
import { H3, P1, AButton } from 'components/highorder'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
import ss from './AppForm.module.css'

//import styles from 'styles/Home.module.css'



export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    async function connSqlServerTest() {
      swal.fire("未實作。")

        // const result = await checkSqlConn(3)
        // const { message, err, dataList } = result
    
        // console.log('connSqlServerTest', { message, err, dataList })
    
        // if (err) {
        //   swal.fire({
        //     title: '測試 SQL Server 連線失敗',
        //     icon: 'error'
        //   })
        // }
        // else {
        //   swal.fire({
        //     title: '測試 SQL Server 連線',
        //     text: message,
        //     icon: 'info'
        //   })
        // }
    
      }

    return (
        <Container>
            <H3>DM0009: 存取 SQL Server</H3>
            <P1>存取 SQL Server 練習。</P1>

            <Divider sx={{ my: 3 }} />

            <AButton mutant="primary" label="測試 SQL Server 連線" onClick={connSqlServerTest} />


        </Container>
    )
}
