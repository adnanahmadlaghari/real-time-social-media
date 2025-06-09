import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Paper, Stack } from '@mui/material';

const ChatHeader = () => {
    return (
        <Box sx={{ padding: 2,}}>
            <Paper position="static">
                <Toolbar>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack>
                            <Avatar />
                        </Stack>
                        <Stack>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                            >
                                Username
                            </Typography>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Paper>
        </Box>
    );
}


export default ChatHeader