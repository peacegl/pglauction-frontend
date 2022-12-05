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
              United Trading Company sells used cars with an affordable rate in
              Dubai, UAE. They have a showroom in Sharjah, an office in Dubai to
              provide comprehensive support and services to the customers. We
              have different affiliates to help provide shipping, clearance, and
              sell cars from USA in Dubai and elsewhere.
            </Typography>
            <Typography component='p' variant='body1' sx={{mt: 3}}>
              United Trading Cars LLC is one of the top companies in UAE selling
              cars from ranging from different models and companies. It also
              provides other services with its affiliates ranging from having
              bidding rooms and computer labs in Sharjah office for you to buy
              cars from USA auctions, shipping your cars, custom clearance for
              your cars and selling your cars at its famous showroom in Sharjah.
            </Typography>
            <Typography component='p' sx={{fontWeight: '500', my: 5}}>
              Customers may ship cars via Peace Global Logistics LLC which is a
              shipping company based in United States having two branches
              located in Georgia and Texas. They are a well established company
              which you may find more information in their website.
              <a
                href='https://peacegl.com'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  marginLeft: 1,
                }}
                rel='noreferrer'
              >
                Peace Global Logistics LLC
              </a>
            </Typography>
            <Typography component='p' sx={{fontWeight: '500', my: 5}}>
              Customers may use custom clearance and other services via our
              affiliate PGLC Shipping LLC. They are a well established company
              having branches in UAE and you may find more information in their
              website.
              <a
                href='https://pglcshipping.com'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  marginLeft: 1,
                }}
                rel='noreferrer'
              >
                PGLC Shipping LLC
              </a>
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
