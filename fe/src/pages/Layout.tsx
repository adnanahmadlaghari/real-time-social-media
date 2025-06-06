import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import CollapsibleSidebar from '../components/Sidebar'

const Layout: React.FC = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <CollapsibleSidebar />
    </Box>

  )
}

export default Layout