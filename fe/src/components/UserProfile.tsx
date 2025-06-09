import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";

interface UserProfileProps {
  id: number;
  onBack?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ id, onBack }) => {
  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Stack direction={"row"} spacing={20} alignItems={"center"} pt={3} >
        {/* Back Button */}
        <IconButton onClick={onBack} aria-label="back" sx={{ position: 'absolute', left: 20 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 600, textAlign: 'center', pt: 2.5 }}>
          <Stack direction={"row"} spacing={2} alignItems="center">
            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
              {id}
            </Avatar>
            <Stack>
              <Typography variant="h5">Name</Typography>
              <Typography variant="subtitle2" color="gray">Userame</Typography>
            </Stack>
          </Stack>
          <Typography variant="body1">This is a user profile description. It contains information about the user, their activities, and other relevant details.</Typography>
        </Stack>
      </Box>
      <Divider sx={{ m: 3 }} />
    </Box>
  )
}

export default UserProfile