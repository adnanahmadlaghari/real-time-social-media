import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

const Layout = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <Outlet />
    </Box>

  )
}

export default Layout