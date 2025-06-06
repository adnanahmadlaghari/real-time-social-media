import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

interface CardProps {
    title: string,
    content: string,
    img: string,
    name: string,
    Date: number
}

const PostCard: React.FC<CardProps> = ({title, content, img, name ,Date}) => {
  return (
    <Card sx={{maxWidth: 500, m: 2,}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {img}
          </Avatar>
        }
        title={name}
        subheader={Date}
      />
      <CardMedia
        component="img"
        image={img}
        alt="Paella dish"
        sx={{maxHeight:"400px"}}
      />
      
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </Typography>
      </CardContent>
      </Card>
  )
}

export default PostCard