import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import {useSelector} from 'react-redux';
import Item from './Item';
import {moneyFormater} from 'configs';

export default function LotInfo() {
  const theme = useTheme();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);
  const contactNumber = '+9390876500';

  const ListItem = () => {
    return (
      <ListItem
        key={value}
        secondaryAction={
          <IconButton edge='end' aria-label='comments'>
            <CommentIcon />
          </IconButton>
        }
        disablePadding
      >
        Heed
      </ListItem>
    );
  };

  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <CardHeader
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
          color: 'white',
          p: 3,
        }}
        title={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
          >
            Sale Information
          </Typography>
        }
      />
      <CardContent sx={{px: 3, py: 0}}>
        <List sx={{width: '100%', bgcolor: 'background.paper', pb: 0}}>
          <Item label='Location:' value={vehicle.location?.name} />
          <Item label='Price:' value={moneyFormater(vehicle.price)} />
          <Item label='Last Updated:' value={vehicle.updated_at} />
        </List>
        <Button
          variant='outlined'
          size='large'
          sx={{mt: 4, width: '100%', borderRadius: 20}}
          href={`https://wa.me/${contactNumber}`}
          target='_blank'
        >
          <WhatsAppIcon />
          <Box pt='2px'>{contactNumber}</Box>
        </Button>
      </CardContent>
    </Card>
  );
}
