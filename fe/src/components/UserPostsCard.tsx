import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

interface CardProps {
    firstName: string;
    lastName: string;
    title: string;
    content: string;
    media: string;
    createdAt: string;
}

const UserPostsCard: React.FC<CardProps> = ({
    firstName,
    lastName,
    title,
    content,
    media,
    createdAt,
}) => {
    return (
        <Card
            sx={{
                width: { xs: '100%', sm: "100%", md: "100%", lg: 400 },
                // margin: '24px auto',
                boxShadow: 4,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 56, height: 56 }} aria-label="profile">
                        {"adnan"}
                    </Avatar>
                }
                title={<Typography variant="h6">{`${firstName} ${lastName}`}</Typography>}
                subheader={<Typography variant="body2">{createdAt}</Typography>}
            />

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

export default UserPostsCard;
