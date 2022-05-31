import { useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'

import TreeContainer from './TreeContainer'

//import styles from 'styles/Home.module.css'

export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleClick() {
        console.info('Pass');
    }

    return (
        <Box>
            <H3>DM2010: Decision Tree UI 畫面試作</H3>
            <pre>selectedIndex:{selectedIndex}</pre>
            <AButton label='測試' mutant='primary' onClick={handleClick} />

            <TreeContainer />

            <List>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 2" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 3" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
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
