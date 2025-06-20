import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IconButton, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface CardProps {
    _id: string,
    title: string;
    content: string;
    media: string;
    createdAt: string;
    author: object,
}

const MyPostsCard: React.FC<CardProps> = ({
    _id,
    title,
    content,
    media,
    createdAt,
    author,
}) => {
    return (
        <Card
            sx={{
                width: { xs: '100%', sm: "100%", md: "100%", lg: 400 },
                // margin: '24px auto',
                boxShadow: 4,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >


            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500], width: 56, height: 56 }} aria-label="profile" src={`http://localhost:3000${author.profile}`} />

                    }
                    title={<Typography variant="h6">{`${author.firstName} ${author.lastName}`}</Typography>}
                    subheader={<Typography variant="body2">{createdAt}</Typography>}
                />
                <Stack paddingRight={2} direction={"row-reverse"} spacing={2}>
                   <IconButton>
                    <Edit />
                   </IconButton>
                   <IconButton>
                    <Delete />
                   </IconButton>
                </Stack>
            </Stack>
            <CardMedia
                component="img"
                height="600"
                width={600}
                image={`http://localhost:3000${media}`}
                alt="Post image"
                sx={{ objectFit: 'cover', }}
            />

            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MyPostsCard;
