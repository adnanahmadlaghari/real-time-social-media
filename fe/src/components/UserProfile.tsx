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
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { instance } from "./Instance/Instance";
import UserPostsCard from "./UserPostsCard";

interface UserProfileProps {
  username: string;
  onBack?: () => void;

}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  onBack,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<object>({})
  const [Tasks, setTasks] = useState<any[]>([])


  const hangleGetSingleUser = async (username: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await instance.get(`/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      setUser(response.data.user)
      setTasks(response.data.user.tasks)
      console.log("i fired", response)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    hangleGetSingleUser(username)
  }, [])

  if (isLoading) {
    return "loading..."
  }

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
          <IconButton onClick={onBack} aria-label="back" sx={{ padding: 2 }}>
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
              isMobile && (
                <IconButton onClick={onBack} aria-label="back" sx={{ padding: 2 }}>
                  <ArrowBack />
                </IconButton>
              )
            }
            <Avatar
              // src={}
              sx={{ width: 100, height: 100, fontSize: 30 }}
            >
            </Avatar>
            <Stack alignItems="flex-start">
              <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{username}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body1" color="text.secondary">
            {"description"}
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Grid container spacing={7} wordwrap="wrap" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
        {
          Tasks.map((task) => {
            return <Grid key={task._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <UserPostsCard {...task} {...user} />
            </Grid>
          })
        }
      </Grid>
    </Box>
  );
};

export default UserProfile;
