import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";



const UserProfile: React.FC = ({
}) => {

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

      {/* Profile Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 4,
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
            <Avatar
              sx={{ width: 100, height: 100, fontSize: 30 }}
            >
R
            </Avatar>
            <Stack alignItems="flex-start">
              <Typography variant="h6">{"adnan"}</Typography>
              <Typography variant="body2" color="text.secondary">
                adnan ahmad
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body1" color="text.secondary">
            this is discription of the profile. It can be a brief introduction or any other relevant information about the user.
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default UserProfile;
