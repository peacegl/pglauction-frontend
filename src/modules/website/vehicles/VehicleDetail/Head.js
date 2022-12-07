import {alpha, Box, colors, Container, Typography} from '@mui/material';
import {useTheme} from '@mui/styles';
import {useSelector} from 'react-redux';
import IntlMessages from '@crema/utility/IntlMessages';

function Head({}) {
  const theme = useTheme();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      position='static'
      zIndex='1'
      sx={{
        minHeight: '70px',
        backgroundColor: 'white',
        border: '0',
        py: 1,
        borderBottom: '1px',
        borderStyle: 'solid',
        borderColor: alpha(theme.palette.primary.main, 0.2),
        color: colors.grey[800],
      }}
    >
      <Container maxWidth='xl'>
        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          alignItems='cemter'
        >
          <Box>
            <Typography
              component='h1'
              fontSize='22px'
              fontWeight='bold'
              overflow='hidden'
              pb={1}
            >
              {vehicle.year} {vehicle?.make} {vehicle.model}
            </Typography>
            <Box display='flex' columnGap='8px'>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  <IntlMessages id='common.lot' />#
                </Box>
                {vehicle.lot_number} |
              </Typography>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  <IntlMessages id='common.sale_location' />
                </Box>{' '}
                {vehicle.location?.name}
              </Typography>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Head;
