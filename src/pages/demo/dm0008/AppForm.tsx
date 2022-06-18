import { useState } from 'react'
import { Container, } from '@mui/material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material'
import { H3, AButton } from 'components/highorder'
// CSS
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
import ss from './AppForm.module.css'

//import styles from 'styles/Home.module.css'

export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Container>
            <H3>DM0008: Animate.css Lab</H3>
            <pre>selectedIndex:{selectedIndex}</pre>

            <H3>test</H3>
            <div>
                <h1 className="animate__animated animate__bounce">An animated element</h1>
            </div>


        </Container>
    )

}
