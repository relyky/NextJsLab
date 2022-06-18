import type { ReactChild } from 'react'
import { useState } from 'react'
import { AppBar, Toolbar, Box, Typography, Button, Menu, MenuItem, Link } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import DownIcon from '@mui/icons-material/ArrowDropDown'

function Banner() {

  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon />
        <Typography variant="h6">
          My First Next.js App
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Button href="/" color="inherit" sx={{ ml: 1 }}>
            Home
          </Button>
          <Button href="/main" color="inherit" sx={{ ml: 1 }}>
            Main
          </Button>

          <MenuGroup label="Demo">
            <MenuItem><Link href="/demo/dm0001" underline="none">Demo 001</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0002" underline="none">React DnD Basic</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0003" underline="none">React DnD Sortable List</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0004" underline="none">React DnD Custom Drag Layer</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0005" underline="none">@mui TreeView Lab</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0006" underline="none">jsdiff Demo</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0007" underline="none">react-spring Lab</Link></MenuItem>
            <MenuItem><Link href="/demo/dm0008" underline="none">animate.css Lab</Link></MenuItem>
          </MenuGroup>

          <MenuGroup label="介面試作">
            <MenuItem><Link href="/demo2/dm2010" underline="none">Decision Tree 新介面試作</Link></MenuItem>
            <MenuItem><Link href="/demo2/dm2020" underline="none">Decision Tree 新介面試作 II</Link></MenuItem>
          </MenuGroup>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

function MenuGroup(props: { label: string, children: ReactChild | ReactChild[] }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = (_) => setAnchorEl(null)

  return (
    <>
      <Button onClick={handleClick} color="inherit" sx={{ ml: 1 }} endIcon={<DownIcon />}>
        {props.label}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {props.children}
      </Menu>
    </>
  )
}

export default Banner