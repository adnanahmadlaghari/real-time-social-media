import { Box, IconButton } from "@mui/material";

interface UserProfileProps {
    id: number;
    onBack?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({id, onBack}) => {
  return (
    <Box>
        <IconButton onClick={onBack} aria-label="back">
            <span>Back</span>
            </IconButton>
        {id}</Box>
  )
}

export default UserProfile