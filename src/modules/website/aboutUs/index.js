import Container from '@mui/material/Container';
import {Box} from '@mui/material';
import AboutUs from './AboutUs';
import LocationOnMap from './LocationOnMap';

const index = () => {
  return (
    <Container maxWidth='xl'>
      <Box sx={{my: 14}}>
        <AboutUs />
        {/* <Box sx={{mb: 5, maxHeight: '40%'}}>
          <LocationOnMap />
        </Box> */}
      </Box>
    </Container>
  );
};

export default index;
