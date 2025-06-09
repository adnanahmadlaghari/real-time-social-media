import { Box } from '@mui/material'
import Posts from '../components/Posts'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{width: '100%', height: '100%'}}>
      <Posts />
    </Box>
  )
}

export default Dashboard