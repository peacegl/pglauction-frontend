import {Box, Button, Stack, Typography} from '@mui/material';
import ImageCarousel from 'components/design/ImageCarousel';
import IntlMessages from '@crema/utility/IntlMessages';
import aboutus from 'assets/about-us/main_image.jpeg';
import aboutus1 from 'assets/about-us/1.jpeg';
import aboutus2 from 'assets/about-us/2.jpeg';
import Title from 'components/design/Title';
import {useRouter} from 'next/router';

const AboutUs = () => {
  const images = [
    {
      id: 1,
      path: aboutus2.src,
      alternativeText: 'About Us Image',
    },
    {
      id: 2,
      path: aboutus.src,
      alternativeText: 'Second About Us Image',
    },
    {
      id: 3,
      path: aboutus1.src,
      alternativeText: 'This About Us Image',
    },
  ];
  const router = useRouter();

  return (
    <>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent='center'
        alignItems='center'
        spacing={8}
      >
        <Box>
          <ImageCarousel images={images} height='100px' />
        </Box>
        <Box sx={{flex: 1}}>
          <Title title={<IntlMessages id='website.about_us' />} />
          <Box sx={{mt: 1}}>
            <Typography component='p' variant='body1'>
              United Trading Company sells used cars with an affordable rate in
              Dubai, UAE. They have a showroom in Sharjah, an office in Dubai to
              provide comprehensive support and services to the customers. We
              have different affiliates to help provide shipping, clearance, and
              sell cars from USA in Dubai and elsewhere.
            </Typography>
            <Typography component='p' variant='body1' sx={{mt: 1}}>
              United Trading Cars LLC is one of the top companies in UAE selling
              cars from ranging from different models and companies. It also
              provides other services with its affiliates ranging from having
              bidding rooms and computer labs in Sharjah office for you to buy
              cars from USA auctions, shipping your cars, custom clearance for
              your cars and selling your cars at its famous showroom in Sharjah.
            </Typography>
            <Typography component='p' sx={{my: 1}}>
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
                https://peacegl.com
              </a>
            </Typography>
            <Typography component='p' sx={{my: 3}}>
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
                https://pglcshipping.com
              </a>
            </Typography>
            <Typography component='p' variant='body1'>
              Having sold over 1400 vehicles and over 200 vehicles in inventory,
              we are one of the leading used cars market in Sharjah, UAE. So
              give us a visit in our showroom located in Sharjah AL Qusais
              Industrial Area Fourth Al Saoud Building Room Number 804 P.O.Box:
              48551, Dubai-U.A.E.
            </Typography>

            <Button
              variant='contained'
              sx={{mt: 2, px: 3}}
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
