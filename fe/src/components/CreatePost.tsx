import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useGlobalVar } from './Global/Global';


const CreatePost = () => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const {setImage, setTitle, setContent, title, content, handleCreatePost, IsLoading} = useGlobalVar()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Create Post</Typography>
      <Stack spacing={2}>
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          maxRows={7}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Avatar
          variant="square"
          sx={{ height: 300, width: 300 }}
          src={imagePreview || undefined}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <Button onClick={handleCreatePost} variant="contained" disabled={IsLoading}>
         {
        IsLoading ? "Uploading..." : "Publish"
        }
        </Button>
      </Stack>
    </Box>
  );
};

export default CreatePost;
