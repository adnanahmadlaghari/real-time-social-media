import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Paper, Stack } from '@mui/material';

interface Props {
  SelectedUserData: {
    profile: string;
    username: string;
  };
}

const ChatHeader: React.FC<Props> = ({SelectedUserData}) => {
    return (
        <Box sx={{ padding: 2,}}>
            <Paper position="static">
                <Toolbar>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack>
                            <Avatar src={`http://localhost:3000${SelectedUserData?.profile}`}/>
                        </Stack>
                        <Stack>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                            >
                                {SelectedUserData?.username}
                            </Typography>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Paper>
        </Box>
    );
}


export default ChatHeader