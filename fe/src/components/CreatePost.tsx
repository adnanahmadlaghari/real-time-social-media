import { Avatar, Box, Stack, TextField, Typography } from '@mui/material'


const CreatePost = () => {
  return (
    <Box sx={{p: 3}}>
      <Typography variant='h5'>Create Post</Typography>  
        <Stack width={"100%"} spacing={2}>
          <Stack >
          <Avatar variant='square' sx={{height: "300px", width:"300px"}}/>
        </Stack>
        <TextField  fullWidth/>
        <TextField  fullWidth multiline maxRows={7}/>
      </Stack>
    </Box>
  )
}

export default CreatePost