import {Box, IconButton, Button, alpha} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useTheme} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import {useRouter} from 'next/router';
import {EastRounded} from '@mui/icons-material';

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
  const theme = useTheme();
  const router = useRouter();

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
            top: '46%',
            left: '0',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.contrastText,
            opacity: 0.3,
            padding: {xs: '0', md: '3px', lg: '5px'},
            zIndex: '10',
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.contrastText,
              opacity: '0.6',
            },
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
            top: '46%',
            right: '0',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.contrastText,
            opacity: 0.3,
            padding: {xs: '0', md: '3px', lg: '5px'},
            zIndex: '10',
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.contrastText,
              opacity: '0.6',
            },
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
            position='absolute'
            left='0'
            top='0'
            right='0'
            bottom='0'
            margin='auto'
          >
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100%'
            >
              <Button
                variant='h1'
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                  borderRadius: 20,
                  opacity: 0.9,
                  px: {
                    xs: 5,
                    md: 8,
                    lg: 12,
                  },
                  py: {
                    xs: 2,
                    md: 4,
                  },
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.contrastText,
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={() => router.push('/all-vehicles')}
              >
                <IntlMessages id='website.all_vehicles' />
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselBanur;
