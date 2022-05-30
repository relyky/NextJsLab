import { useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'

//import styles from 'styles/Home.module.css'

export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Box>
            <h1>DM2010</h1>
            <pre>selectedIndex:{selectedIndex}</pre>

            <List>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 1} onClick={()=>setSelectedIndex(1)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 2} onClick={()=>setSelectedIndex(2)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 2" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 3} onClick={()=>setSelectedIndex(3)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 3" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 4} onClick={()=>setSelectedIndex(4)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 4" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

}
