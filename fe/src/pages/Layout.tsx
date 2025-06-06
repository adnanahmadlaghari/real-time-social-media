import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import Navbar from '../components/Navbar'
import CollapsibleSidebar from '../components/Sidebar'

const Layout: React.FC = () => {

  return (
    <Grid>
      <Navbar />
      <Outlet />
      <CollapsibleSidebar />
    </Grid>

  )
}

export default Layout