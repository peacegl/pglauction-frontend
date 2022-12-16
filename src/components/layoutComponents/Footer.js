import {Box, Container, Link, Stack, Typography} from '@mui/material';
import logoImage from '../../assets/united_logo.png';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';
import {pages} from './AppBar';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();

  const title = (title) => (
    <Typography variant='h2' pb='12px'>
      {title}
    </Typography>
  );

  const link = (text, link, index) => (
    <Box marginBottom='10px' key={index}>
      <Link
        component='button'
        variant='body2'
        display='block'
        fontSize='14px'
        underline='none'
        onClick={() => router.push(link)}
        color={theme.palette.text.secondary}
      >
        {text}
      </Link>
    </Box>
  );
  return (
    <Box
      sx={{
        mt: 17,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          py: {xs: 10, sm: 15},
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{xs: 'column', md: 'row'}}
            justifyContent='space-between'
            alignItems={{xs: 'center', sm: 'start'}}
            color={theme.palette.text.secondary}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                textAlign: 'center',
              }}
            >
              <Box sx={{flex: {md: 3}, mb: 5}}>
                <Box
                  component='img'
                  sx={{
                    width: {xs: '120px', md: '140px', lg: '150px', xl: '160px'},
                  }}
                  alt='united logo'
                  src={logoImage.src}
                />
                <Typography sx={{m: 4, ml: 0}} variant='body1'>
                  United Trading Company sells used cars with an affordable rate
                  in Dubai, UAE. They have a showroom in Sharjah and an office
                  in Dubai to provide comprehensive support and services to the
                  customers. We have different affiliates to help provide
                  shipping, clearance, and sell cars from USA in Dubai. They are the leading cars showroom in Dubai, UAE having variety of cars.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: {xs: 'center', sm: 'start'},
                  mb: 5,
                }}
              >
                {title('Quick Links')}
                {pages.map((page, index) => link(page.title, page.link, index))}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: {xs: 'center', sm: 'start'},
                  mb: 5,
                }}
              >
                {title('About Us')}
                {link('About Us', '/')}
                {title('Support')}
                {link('Support', '/contact-us')}
                {link('Terms & Condations', '/terms')}
                {link('Privacy Policy', '/policy')}
              </Box>
              <Box
                sx={{
                  flex: 1.2,
                  textAlign: {xs: 'center', sm: 'start'},
                  mb: 5,
                }}
              >
                {title('Location')}

                <Box
                  marginBottom='10px'
                  display='flex'
                  alignItems='center'
                  sx={{
                    justifyContent: {xs: 'center', sm: 'flex-start'},
                  }}
                >
                  <LocationOnOutlinedIcon />
                  <Typography
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    mx='5px'
                  >
                    AL Qusais Industrial Area Fourth Al Saoud Building
                    <br />
                    Room Number 804 P.O.Box: 48551, Dubai-U.A.E.
                  </Typography>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  alignItems='center'
                  sx={{justifyContent: {xs: 'center', sm: 'flex-start'}}}
                >
                  <PhoneOutlinedIcon />
                  <Link
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='tel:+971565929272'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    +971 56 592 9272
                  </Link>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  sx={{justifyContent: {xs: 'center', sm: 'flex-start'}}}
                >
                  <EmailOutlinedIcon />
                  <Link
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='mailto:utc@peacegl.com'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    utc@peacegl.com
                  </Link>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  sx={{justifyContent: {xs: 'center', sm: 'flex-start'}}}
                >
                  <EmailOutlinedIcon />
                  <Link
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='mailto:crm@peacegl.com'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    crm@peacegl.com
                  </Link>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box>
        <Typography
          color={theme.palette.primary.main}
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            backgroundColor: (theme) => theme.palette.background.paper,
            py: 3,
          }}
        >
          &copy;{new Date().getFullYear()} United Cars Auction. All Rights
          Reserved
        </Typography>
      </Box>
    </Box>
  );
}
