import { useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
import ss from './AppForm.module.css'

//import styles from 'styles/Home.module.css'

export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Box>
            <h1>AppForm</h1>
            <pre>selectedIndex:{selectedIndex}</pre>

            <p>測試 item.hover </p>


            <List>
                <ListItem disablePadding secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 2" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 3" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Item 4" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider sx={{ my: 3 }} />

            <List>
                <ListItem className={ss.item} disablePadding secondaryAction={
                    <IconButton className={ss.command} edge="end" aria-label="delete">
                        <DraftsIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                        <ListItemText primary="Item 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem className={ss.item} disablePadding secondaryAction={
                    <IconButton className={ss.command} edge="end" aria-label="delete">
                        <InboxIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                        <ListItemText primary="Item 2" />
                    </ListItemButton>
                </ListItem>
                <ListItem className={ss.item} disablePadding secondaryAction={
                    <IconButton className={ss.command} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemButton selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                        <ListItemText primary="Item 3" />
                    </ListItemButton>
                </ListItem>
                <ListItem className={ss.item} disablePadding secondaryAction={
                    <div className={ss.command}>
                        <IconButton edge="end" sx={{ ml: .5 }}>
                            <DraftsIcon />
                        </IconButton>
                        <IconButton edge="end" sx={{ ml: .5 }}>
                            <InboxIcon />
                        </IconButton>
                        <IconButton edge="end" sx={{ ml: .5 }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                }>
                    <ListItemButton selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
                        <ListItemText primary="Item 4" />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    )

}
