import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';


const ChatFooter = () => {
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
                                    <IconButton>
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