import React from 'react';
import {Box, Container, Link, Typography} from '@mui/material';
import {useTheme} from '@mui/styles';
import logoImage from '../../assets/united_logo.jpg';
import Image from 'next/image';
import {pages} from './AppBar';
import {useRouter} from 'next/router';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();

  const title = (title) => (
    <Typography variant='h2' color={theme.palette.primary.main} pb='20px'>
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
      >
        {text}
      </Link>
    </Box>
  );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '400px',
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              columnGap: '45px',
            }}
          >
            <Box sx={{width: '30%'}}>
              <Image
                width='140'
                height='140'
                src={logoImage.src}
                alt='united logo'
              />
              <Typography>
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
            <Box sx={{width: '30%'}}>{title('Location')}</Box>
          </Box>
        </Container>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        width='100%'
        position='static'
        bottom='0'
        zIndex='1'
        style={{
          width: '100%',
          backgroundColor: 'white',
        }}
        sx={{height: {xs: '60px', sm: '70px', md: '80px'}}}
      >
        <Container maxWidth='xl'>
          <Box
            margin='auto'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Typography color={theme.palette.primary.main}>
              &copy;{new Date().getFullYear()} United Auction Cars. All Rights
              Reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
