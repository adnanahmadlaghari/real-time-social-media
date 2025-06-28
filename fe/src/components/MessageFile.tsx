import { Avatar, Paper, Stack, useTheme } from '@mui/material'
import React from 'react'

interface Prop{
    message: () => void
}
const MessageFile: React.FC<Prop> = ({message}) => {
    const theme = useTheme()
  return (
     <Stack direction={"row"} width={"100%"} justifyContent={message.incoming ? "start" : "end"}>
            <Paper elevation={1} sx={{
                borderRadius: 2,
                p: 1.5,
                backgroundColor: message.incoming ? theme.palette.background.default  : theme.palette.primary.main,
                color: message.incoming ? "inherit"  : "black" 

            }}>
                <Avatar sx={{height: "200px", width: "200px"}} variant='square'/>
            </Paper>
        </Stack>
  )
}

export default MessageFile