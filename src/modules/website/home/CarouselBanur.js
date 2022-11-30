import {Box, Typography, IconButton, useMediaQuery} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useTheme} from '@mui/material';

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace('./', 'assets/home_carousel/')] = r(item);
    return acc;
  }, {});

const textureImports = importAll(
  require.context('../../../assets/home_carousel', false, /\.(png|jpe?g|svg)$/),
);

const CarouselBanur = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  Object.values(textureImports).map((texture, index) => {
    console.log(texture);
  });
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay={true}
      interval={10000}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            color: 'black',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateBeforeIcon sx={{fontSize: 40}} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            color: 'black',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateNextIcon sx={{fontSize: 40}} />
        </IconButton>
      )}
    >
      {Object.values(textureImports).map((texture, index) => (
        <Box
          key={`carousel-image-${index}`}
          sx={{height: {xs: '300px', sm: '400px', md: '600px', lg: '700px'}}}
        >
          <img
            src={texture.default.src}
            alt={`carousel-${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundAttachment: 'fixed',
            }}
          />
          <Box
            color='white'
            padding='20px'
            borderRadius='1px'
            textAlign='left'
            backgroundColor='rgb(0, 0, 0, 0.4)'
            position='absolute'
            top='46%'
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? undefined : '0'}
            margin={isNonMobile ? undefined : '0 auto'}
            maxWidth={isNonMobile ? undefined : '240px'}
          >
            <Typography
              fontWeight='bold'
              color={theme.palette.secondary.main}
              sx={{textDecoration: 'underline'}}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselBanur;
