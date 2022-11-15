import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActionArea} from '@mui/material';
import PropTypes from 'prop-types';

export default function AuctionListItem(props) {
  return (
    <Card sx={{borderRadius: 1, display: 'flex', mb: 4}}>
      <CardMedia
        component='img'
        sx={{width: 300}}
        image={props.item.images[0].path}
        alt='preview'
      />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Lizard
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
AuctionListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
