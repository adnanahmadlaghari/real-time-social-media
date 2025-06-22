import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useGlobalVar } from "../components/Global/Global";
import MyPostsCard from "../components/MyPostsCard";
import ProfileDialog from "../components/ProfileDialog";
import { useState } from "react";



const Profile: React.FC = () => {

  const { CrruntUser, MyPosts, IsLoading } = useGlobalVar()
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (!CrruntUser) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Loading user...</Typography>
      </Box>
    );
  }
  if (IsLoading) {
    return <Typography>loading...</Typography>
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
                sx={{ width: 100, height: 100, fontSize: 30, objectFit:"cover" }}
                src={`http://localhost:3000${CrruntUser.profile}`}
              />


            <Stack alignItems="flex-start">
              <Typography variant="h6">{CrruntUser.firstName} {CrruntUser.lastName}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{CrruntUser.username}
              </Typography>
            </Stack>
          </Stack>

         <Stack sx={{alignItems: 'end'}}>
          <Button variant="contained" onClick={handleClickOpen}>
          Edit Profile
         </Button>
         </Stack>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />
      {
        MyPosts.length <= 0 ? (<Stack sx={{ alignItems: "center" }}>
          <Typography >No Posts</Typography>
        </Stack>) : (
          <Grid container spacing={7} wordwrap="wrap" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            {
              MyPosts.map((post: any) => {
                return <Grid key={post._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <MyPostsCard {...post} />
                </Grid>
              })
            }
          </Grid>
        )
      }
{
  open && <ProfileDialog handleClose={handleClose} open={handleClickOpen}/>
}
    </Box>
  );
};

export default Profile;
