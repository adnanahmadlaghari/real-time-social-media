import { Outlet } from 'react-router-dom'
import { Box} from '@mui/material'
import Navbar from '../components/Navbar'
import CollapsibleSidebar from '../components/Sidebar'

const Layout: React.FC = () => {

  return (
    <Box>
      <Navbar />
      <Outlet />
      <CollapsibleSidebar />
    </Box>

  )
}

export default Layout