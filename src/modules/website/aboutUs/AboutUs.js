import {Box, Button, Stack, Typography} from '@mui/material';
import ImageCarousel from 'components/design/ImageCarousel';
import IntlMessages from '@crema/utility/IntlMessages';
import Title from 'components/design/Title';
import {useRouter} from 'next/router';

const AboutUs = () => {
  const router = useRouter();
  // imports all images from assets folder
  const importAll = (r) =>
    r.keys().reduce((acc, item) => {
      acc[item.replace('./', 'assets/about-us/carousel/')] = r(item);
      return acc;
    }, {});

  const textureImports = importAll(
    require.context(
      '../../../assets/about-us/carousel',
      false,
      /\.(png|jpe?g|svg)$/,
    ),
  );

  const images = [];
  Object.values(textureImports).map((texture, index) => {
    images.push({
      id: index,
      path: texture.default.src,
      alternativeText: 'About Us Image',
    });
  });

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
              Dubai, UAE. We have a showroom in Sharjah, an office in Dubai to
              provide comprehensive support and services to the customers. We
              have different affiliates to help provide shipping, clearance, and
              sell cars from USA in Dubai and elsewhere.
            </Typography>
            <Typography component='p' variant='body1' sx={{mt: 1}}>
              United Trading Company LLC is one of the top companies in UAE
              selling cars from ranging from different models and companies. We
              also provides other services with its affiliates ranging from
              having bidding rooms and computer labs in Sharjah office for you
              to buy cars from USA auctions, shipping your cars, custom
              clearance for your cars and selling your cars at its famous
              showroom in Sharjah.
            </Typography>
            <Typography component='p' sx={{my: 1}}>
              Customers may ship cars via Peace Global Logistics LLC which is a
              shipping company based in United States having two branches
              located in Georgia and Texas. We are a well established company
              which you may find more information in their <span></span>
              <a
                href='https://peacegl.com'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  marginLeft: 1,
                }}
                rel='noreferrer'
              >
                website.
              </a>
            </Typography>
            <Typography component='p' sx={{my: 3}}>
              Customers may use custom clearance and other services via our
              affiliate PGLC Shipping LLC. We are a well established company
              having branches in UAE and you may find more information in their
              <span> </span>
              <a
                href='https://pglcshipping.com'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  marginLeft: 1,
                }}
                rel='noreferrer'
              >
                website.
              </a>
            </Typography>
            <Typography component='p' variant='body1'>
              We are one of the leading used cars market in Sharjah, UAE. So
              give us a visit in our showroom located in Sharjah Industrial Area
              2, Sharjah-U.A.E.
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
