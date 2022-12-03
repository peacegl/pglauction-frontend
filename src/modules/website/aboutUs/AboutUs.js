import IntlMessages from '@crema/utility/IntlMessages';
import Title from '../../../components/design/Title';
import {Box, Button, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import aboutus from '../../../assets/about-us.jpg';

const AboutUs = () => {
  const router = useRouter();

  return (
    <>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent='center'
        alignItems='center'
        spacing={8}
      >
        <Box sx={{flex: 1}}>
          <img src={aboutus.src} alt='about-us' width='100%' />
        </Box>
        <Box sx={{flex: 1}}>
          <Title title={<IntlMessages id='website.about_us' />} />
          <Box sx={{mt: 2}}>
            <Typography component='p' variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography component='p' variant='body1'>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Typography component='p' sx={{fontWeight: 'bold', my: 5}}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Button
              variant='contained'
              sx={{mt: 2, px: 5}}
              onClick={() => router.push('/contact-us')}
            >
              <IntlMessages id='website.contact_us' />
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default AboutUs;
