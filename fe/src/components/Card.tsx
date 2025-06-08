import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

interface CardProps {
  id: number;
  title: string;
  content: string;
  img: string;
  name: string;
  Date: number;
  handleClick?: (id: number) => void;
}

const PostCard: React.FC<CardProps> = ({
  id,
  title,
  content,
  img,
  name,
  Date,
  handleClick,
}) => {
  return (
    <Card
      sx={{
        width: 600,
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
        handleClick && handleClick(id);
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 56, height: 56 }} aria-label="profile">
            {name[0]}
          </Avatar>
        }
        title={<Typography variant="h6">{name}</Typography>}
        subheader={<Typography variant="body2">{Date}</Typography>}
      />

      <CardMedia
        component="img"
        height="600"
        width={600}
        image={img}
        alt="Post image"
        sx={{ objectFit: 'cover' }}
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
