import React from 'react';
import {Box, Container, Link, Paper, Stack, Typography} from '@mui/material';
import {useTheme} from '@mui/styles';
import logoImage from '../../assets/united_logo.png';
import Image from 'next/image';
import {pages} from './AppBar';
import {useRouter} from 'next/router';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();

  const title = (title) => (
    <Typography variant='h2' pb='20px'>
      {title}
    </Typography>
  );

  const link = (text, link) => (
    <Box marginBottom='10px'>
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
          py: 15,
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{xs: 'column', md: 'row'}}
            justifyContent='space-between'
            alignItems={{xs: 'center', md: 'flex-start'}}
            color={theme.palette.text.secondary}
          >
            <Box sx={{width: '30%'}}>
              <Box sx={{mt: 1}}>
                <img width='160' src={logoImage.src} alt='united logo' />
              </Box>
              <Typography sx={{mt: 4}}>
                Cum qui totam eligendi. Eos sed perferendis consequuntur
                cupiditate voluptas aut et. Deserunt neque nobis est numquam ut
                Cum qui totam eligendi. Eos sed perferendis consequuntur
                cupiditate voluptas aut et. Deserunt neque nobis est numquam ut.
                Cum qui totam eligendi.
              </Typography>
            </Box>
            <Box sx={{width: '20%'}}>
              {title('Quick Links')}
              {pages.map((page, index) => link(page.title, page.link))}
            </Box>
            <Box sx={{width: '20%', display: 'flex', flexDirection: 'column'}}>
              {title('About Us')}
              {link('About Us', '/')}
              {title('Support')}
              {link('Support', '/')}
              {link('Terms & Condation', '/')}
              {link('Privacy Policy', '/')}
            </Box>
            <Box sx={{width: '30%'}}>
              {title('Location')}

              <Box marginBottom='10px' display='flex' alignItems='center'>
                <LocationOnOutlinedIcon />
                <Typography
                  variant='body2'
                  fontSize='14px'
                  underline='none'
                  mx='5px'
                >
                  AL Qusais Industrial Area Fourth Al Saoud Building Room Number
                  804 P.O.Box: 48551, Dubai-U.A.E.
                </Typography>
              </Box>
              <Box marginBottom='10px' display='flex' alignItems='center'>
                <PhoneOutlinedIcon />
                <Link
                  variant='body2'
                  fontSize='14px'
                  underline='none'
                  href='tel:+976776655688'
                  mx='5px'
                  color={theme.palette.text.secondary}
                >
                  (+97)6776655688
                </Link>
              </Box>
              <Box marginBottom='10px' display='flex' alignItems='center'>
                <EmailOutlinedIcon />
                <Link
                  variant='body2'
                  fontSize='14px'
                  underline='none'
                  href='mailto:email@example.com'
                  mx='5px'
                  color={theme.palette.text.secondary}
                >
                  email@example
                </Link>
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
