import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function AuctionCard({item, ...props}) {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component='img'
        height='200'
        image={item.images[0].path}
        alt='green iguana'
      />
      <CardContent>
        <Typography>{item.bids_count}</Typography>
        <Typography gutterBottom variant='h5'>
          {item.title}
        </Typography>
        <Typography gutterBottom variant='h6'>
          {item.subtitle}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
AuctionCard.propTypes = {
  item: PropTypes.item,
};
