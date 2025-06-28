import { Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useGlobalVar } from './Global/Global';

interface Props {
    message: {
        sender: string;
        text: string;
    };
    Selected: string;

}
const MessageText: React.FC<Props> = ({ message, Selected }) => {
    const theme = useTheme()
    const { CrruntUser } = useGlobalVar();
    return (
        <Stack direction={"row"} width={"100%"} justifyContent={message.sender === CrruntUser._id ? "end" : "start"}>
            <Paper elevation={1} sx={{
                borderRadius: 2,
                p: 1.5,
                backgroundColor:
                    message.sender === CrruntUser._id
                        ? theme.palette.primary.main // you sent it
                        : theme.palette.background.default // you received it
                ,
                color: message.sender !== Selected ? "black" : "inherit"

            }}>
                <Typography>{message.text}</Typography>
            </Paper>
        </Stack>
    )
}

export default MessageText