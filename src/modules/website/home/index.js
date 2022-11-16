import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocationsList from '../../../components/locations/LocationsList';
import CategoriesList from '../../../components/categories/CategoriesList';
import AuctionsList from '../../../components/auctions/AuctionsList';

export default function Home() {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
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
  );
}
