import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useGlobalVar } from "./Global/Global";
import type React from "react";

interface Props{
    Selected: string,
}

const ChatFooter: React.FC<Props> = ({Selected}) => {

    const {Text, setText, handleSendMessage} = useGlobalVar()

    const handleSubmit = () => {
        handleSendMessage(Selected)
        console.log("i fired")
    }
    return (
        <Box
            sx={{
                bottom: 0,
                padding: 2,
            }}>
            <Box>
                {/* Input field for sending messages */}
                <TextField
                    fullWidth
                    type="text"
                    placeholder="Type your message..."
                    onChange={(e) => setText(e.target.value)}
                    value={Text}
                    multiline
                    maxRows={4}
                    style={{
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    
                />
            </Box>
        </Box>
    )
}

export default ChatFooter