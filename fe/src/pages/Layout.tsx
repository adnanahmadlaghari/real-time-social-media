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
        height: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
        <CollapsibleSidebar />
      </Box>

    </Box>

  )
}

export default Layout
