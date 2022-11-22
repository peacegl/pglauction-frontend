import {useDispatch, useSelector} from 'react-redux';
import {styled, alpha} from '@mui/material/styles';
import {Badge, Box, Container, IconButton} from '@mui/material';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';

import {AppSearchBar} from '@crema';

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      position='static'
      zIndex='1'
      style={{
        width: '100%',
        background: 'white',
      }}
      sx={{height: {xs: '60px', sm: '70px', md: '80px'}}}
    >
      <Container maxWidth='xl'>
        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box
            onClick={() => router.push('/')}
            sx={{'&:hover': {cursor: 'pointer'}}}
            color={theme.palette.secondary.main}
          >
            United Auction
          </Box>
          <Box sx={{display: {xs: 'none', md: 'block'}}}>
            <AppSearchBar
              width='450px'
              placeholder='Search Inventory By Make, Model, Vin, and More...'
            />
          </Box>

          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{columnGap: {xs: '2px', sm: '5px', md: '8px'}}}
            zIndex='2'
          >
            <IconButton sx={{color: '#1976d2'}}>
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton sx={{color: '#f605a6'}}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{color: '#4ecc5c'}}>
              <WhatsAppIcon />
            </IconButton>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              columnGap: {xs: '2px', sm: '5px', md: '8px'},
              display: {xs: 'block', md: 'none'},
            }}
            zIndex='2'
          >
            <IconButton sx={{color: theme.palette.secondary.main}}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
