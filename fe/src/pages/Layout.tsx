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
    <Box sx={{ display: "flex", flex: 1 }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
      <CollapsibleSidebar />
    </Box>
  </Box>

  )
}

export default Layout
