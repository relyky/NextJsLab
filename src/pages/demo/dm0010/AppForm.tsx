import { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material'
import { H3, H4 } from 'components/highorder'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
import ss from './AppForm.module.css'
//import styles from 'styles/Home.module.css'

export default (props) => {
    const [commodityList, setCommodityList] = useState<Commodity[]>([])

    useEffect(() => {
        const itemList = qryCommodityList()
        setCommodityList(itemList)
    }, [])

    return (
        <Box>
            <H3>DM0010: SSR 練習</H3>
            <H4>模擬商品清單</H4>
            <List>
                {commodityList.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={`${item.cid}-${item.cname} 數量 ${item.amount}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 3 }} />
        </Box>
    )

}

// Resource
interface Commodity {
    cid: string,
    cname: string,
    amount: number,
}

function qryCommodityList(): Commodity[] {
    return [
        { cid: 'C01', cname: '商品1號', amount: 17 },
        { cid: 'C02', cname: '商品2號', amount: 21 },
        { cid: 'C03', cname: '商品3號', amount: 390 },
        { cid: 'C04', cname: '商品4號', amount: 434 },
        { cid: 'C05', cname: '商品5號', amount: 5 },
        { cid: 'C06', cname: '商品6號', amount: 6 },
        { cid: 'C07', cname: '商品7號', amount: 7 },
        { cid: 'C08', cname: '商品8號', amount: 87 },
        { cid: 'C09', cname: '商品9號', amount: 93 },
        { cid: 'C10', cname: '商品10號', amount: 102 },
    ]
}

