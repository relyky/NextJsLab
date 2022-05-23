import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'

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
          <Button href="/demo/dm0001" color="inherit" sx={{ ml: 1 }}>
            Demo 001
          </Button>
          <Button href="/demo/dm0002" color="inherit" sx={{ ml: 1 }}>
            Demo 002
          </Button>
          <Button href="/demo/dm0003" color="inherit" sx={{ ml: 1 }}>
            Demo 003
          </Button>
        </Box>
        <Button color="inherit" sx={{ ml: 1 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Banner