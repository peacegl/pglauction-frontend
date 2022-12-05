import {Box, Divider, Button, CardActionArea} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import AppTooltip from '@crema/core/AppTooltip';
import {moneyFormater} from 'configs';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';

export default function GridItem({item, ...props}) {
  const router = useRouter();
  const cardRef = useRef();
  // const [height, setHeight] = useState('260px');

  // useLayoutEffect(() => {
  //   setHeight((cardRef.current?.clientWidth / 4) * 3 + 'px');
  // });

  return (
    <Card sx={{borderRadius: 1}} ref={cardRef}>
      <CardActionArea onClick={() => router.push(`/all-vehicles/${item.id}`)}>
        <Box overflow='hidden'>
          <CardMedia
            component='img'
            // height={height}
            image={item.images.find((item) => item.type == 'main_image').path}
            alt='preview'
            sx={{
              objectFit: 'cover',
              transition: 'all 450ms ease-out',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
        </Box>
        <CardContent>
          <AppTooltip
            title={`${item?.year} ${item?.model.make?.name} 
            ${item.model?.name}`}
          >
            <Typography
              noWrap
              gutterBottom
              variant='h4'
              component='h4'
              color='primary'
            >
              {item.year} {item.model?.make?.name} {item.model?.name}
            </Typography>
          </AppTooltip>
          <Divider sx={{my: 2}} />
          <Box display='flex' justifyContent='space-between'>
            <Typography color='primary' fontWeight='bold'>
              {moneyFormater(item.price)}
            </Typography>
            <Typography color='primary'>{item.odometer} Miles</Typography>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Button
              flex='1'
              variant='outlined'
              borderRadius='28'
              size='small'
              sx={{mt: 2, px: 2}}
              href=''
            >
              <BookmarkAddIcon />
              Watch
            </Button>
            <Button
              flex='1'
              onClick={(e) => e.stopPropagation()}
              variant='contained'
              size='small'
              sx={{mt: 2}}
              href='https://wa.me/+937669086'
              target='_blank'
            >
              <WhatsAppIcon sx={{mx: 1}} />
              +937669086
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
GridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
