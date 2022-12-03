import {alpha, Box, colors, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';
import {useSelector} from 'react-redux';

function Head({}) {
  const router = useRouter();
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
              {vehicle.year} {vehicle?.model?.make?.name} {vehicle.model?.name}
            </Typography>
            <Box display='flex' columnGap='10px'>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  Lot#
                </Box>
                {vehicle.lot_number} |
              </Typography>
              <Typography component='div' overflow='hidden'>
                <Box component='span' display='inline' fontWeight='bold'>
                  Sale Location:
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
