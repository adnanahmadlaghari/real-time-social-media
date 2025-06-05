import { Outlet } from 'react-router-dom'
import { Grid, Stack } from '@mui/material'
import Navbar from '../components/Navbar'

const Layout: React.FC = () => {

  return (
    <Grid>
      <Navbar />

      <Stack direction={"row"}>
        <Outlet />
      </Stack>

    </Grid>

  )
}

export default Layout