import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
// import Dashboard from './Dashboard'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const Layout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// Function to toggle sidebar
const toggleSidebar = () => {
  setSidebarCollapsed((prev) => !prev);
};

  return (
   <Box sx={{ display: 'flex', height: '100vh' }}>
  {/* Navbar */}
  <Box sx={{ width: '100%', position: 'fixed', zIndex: 1300 }}>
    <Navbar onToggleSidebar={toggleSidebar} />
  </Box>

  {/* Sidebar  */}
  <Box
    sx={{
      width: sidebarCollapsed ? 72 : 240,
      transition: 'width 0.3s ease',
      pt: 8, // to push it under navbar
    }}
  >
    {/* <Dashboard mini={sidebarCollapsed} /> */}
  </Box>

  {/* Main Content */}
  <Box sx={{ flexGrow: 1, pt: 8, pl: 2, pr: 2 }}>
    {/* Your routed or page content here */}
    <Outlet />
  </Box>
</Box>

  )
}

export default Layout