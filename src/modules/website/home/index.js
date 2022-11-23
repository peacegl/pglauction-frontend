import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocationsList from '../../../components/locations/LocationsList';
import CategoriesList from '../../../components/categories/CategoriesList';
import AuctionsList from '../../../components/auctions/AuctionsList';
import CarouselBanur from './CarouselBanur';
import CustomCarousel from '../../CustomCarousel';

const relatedCourses = [
  {
    id: 1,
    image: 'http://localhost:8000/storage/test/8.jpg',
    title: 'How to attract client 1st time',
    author: 'Patya pindo',
    views: '1.5k',
  },
  {
    id: 2,
    image: 'http://localhost:8000/storage/test/9.jpg',
    title: 'How to secure good marks',
    author: 'Patya pindo',
    views: '1.8k',
  },
  {
    id: 3,
    image: 'http://localhost:8000/storage/test/10.jpg',
    title: 'How to attract client 1st time',
    author: 'Patya pindo',
    views: '1.5k',
  },
  {
    id: 4,
    image: 'http://localhost:8000/storage/test/11.jpg',
    title: 'How to secure good marks',
    author: 'Patya pindo',
    views: '1.8k',
  },
  {
    id: 5,
    image: 'http://localhost:8000/storage/test/5.jpg',
    title: 'How to secure good marks',
    author: 'Patya pindo',
    views: '1.8k',
  },
  {
    id: 6,
    image: 'http://localhost:8000/storage/test/7.jpg',
    title: 'How to secure good marks',
    author: 'Patya pindo',
    views: '1.8k',
  },
];
export default function Home() {
  return (
    <>
      <CarouselBanur></CarouselBanur>
      <Container maxWidth='xl' sx={{mt: 6}}>
        <CustomCarousel relatedCourses={relatedCourses} />

        {/* <Grid container spacing={5}>
        <Grid item xs={3}>
          <Stack direction='column' spacing={10}>
            <Box>
              <Typography variant='h5' sx={{mb: 2, ml: 1}}>
                Regions
              </Typography>
              <Divider />
              <LocationsList />
            </Box>
            <Box>
              <Typography variant='h5' sx={{mb: 2, ml: 1}}>
                Categories
              </Typography>
              <Divider />
              <CategoriesList />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <AuctionsList />
        </Grid>
      </Grid> */}
      </Container>
    </>
  );
}
