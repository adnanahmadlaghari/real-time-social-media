import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface UserProfileProps {
  id: number;
  onBack?: () => void;
  name?: string;
  username?: string;
  description?: string;
  avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  id,
  onBack,
  name = "John Doe",
  username = "johndoe123",
  description = "This is a user profile description. It contains information about the user, their activities, and other relevant details.",
  avatarUrl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100vw",
        boxSizing: "border-box",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        {isMobile ? (
          <></>
        ) : (
          <IconButton onClick={onBack} aria-label="back" sx={{padding:2}}>
            <ArrowBack />
          </IconButton>
        )}
      </Stack>

      {/* Profile Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
            {
              isMobile ? (
                <IconButton onClick={onBack} aria-label="back" sx={{padding:2}}>
            <ArrowBack />
          </IconButton>
              ) : (
                <></>
              )
            }
            <Avatar
              src={avatarUrl}
              sx={{ width: 100, height: 100, fontSize: 30 }}
            >
              {avatarUrl ? "" : name.charAt(0).toUpperCase()}
            </Avatar>
            <Stack alignItems="flex-start">
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{username}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default UserProfile;
