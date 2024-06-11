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
        <Box sx={{flex: 1}}>
          <ImageCarousel images={images} hideMagnifier />
        </Box>
        <Box sx={{flex: 1}}>
          <Title title={<IntlMessages id='website.about_us' />} />
          <Box sx={{mt: 1}}>
            <Typography component='p' variant='body1'>
              Labore nulla Lorem esse fugiat fugiat pariatur excepteur nostrud
              occaecat ad labore. Sunt commodo aliquip laboris officia ea.
              Officia quis nisi voluptate cupidatat labore ea aliqua sunt.
              Pariatur consequat et qui exercitation excepteur. Deserunt
              consequat ea reprehenderit excepteur irure nisi voluptate commodo
              laboris voluptate anim qui.
            </Typography>
            <Typography component='p' variant='body1' sx={{mt: 1}}>
              Est dolor laborum aute pariatur ex occaecat nulla labore tempor
              nisi velit voluptate quis veniam. Cillum et velit commodo quis.
              Qui incididunt in consectetur aute magna laborum enim enim. Quis
              velit sunt non voluptate in sunt. Magna consectetur est quis est
              culpa magna commodo dolor ex. Nisi ullamco est enim ut cupidatat
              eu pariatur velit dolore eiusmod non laboris. Cillum pariatur esse
              nisi est aute nostrud dolor id.
            </Typography>
            <Typography component='p' sx={{my: 1}}>
              Ipsum eiusmod proident in proident ullamco Lorem. Sunt occaecat in
              pariatur anim. Veniam anim laboris duis enim proident anim ex ea.
              Nisi dolore cupidatat laborum Lorem aliqua sunt id ut non
              consectetur commodo deserunt qui.
            </Typography>
            <Typography component='p' sx={{my: 3}}>
              Customers may use custom clearance and other services via our
              affiliate PGLC Shipping LLC. We are a well established company
              having branches in UAE and you may find more information in their
            </Typography>
            <Typography component='p' variant='body1'>
              Cillum cillum sit laboris cillum amet consequat laborum. Lorem
              ullamco labore ex eiusmod labore voluptate dolore id non ea dolore
              duis in. Laborum nisi nostrud aute nulla.
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
