import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

interface CardProps {
  _id: string;
  title: string;
  content: string;
  media: string;
  createdAt: string;
  author: object,
  handleClick?: (id: number) => void;
}

const PostCard: React.FC<CardProps> = ({
  _id,
  title,
  content,
  media,
  createdAt,
  author,
  handleClick,
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
          cursor: handleClick ? 'pointer' : 'default',
        },
      }}
      onClick={() => {
        handleClick && handleClick(_id);
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 56, height: 56 }} aria-label="profile">
            {"adnan"}
          </Avatar>
        }
        title={<Typography variant="h6">{`${author.firstName} ${author.lastName}`}</Typography>}
        subheader={<Typography variant="body2">{createdAt}</Typography>}
      />

      <CardMedia
        component="img"
        height="600"
        width={600}
        image={"https://media.themoviedb.org/t/p/w300_and_h450_bestv2/gvBNGXWEyTHALxedaqRlOQgJt1S.jpg"}
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

export default PostCard;
