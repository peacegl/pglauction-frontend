import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Card, CardContent, Stack} from '@mui/material';
import PropTypes from 'prop-types';

const Head = () => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'row', sm: 'row'},
        alignItems: 'center',
        mb: 2,
        px: 2,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        fontWeight: 'bold',
      }}
    >
      <Box sx={{flex: {xs: 1, sm: 2, md: 2, lg: 1}}} overflow='hidden'>
        <IntlMessages id='website.auctionsLocation' />
      </Box>
      <CardContent sx={{flex: {xs: 1, sm: 4, md: 4}}}>
        <Stack direction='row' spacing={2}>
          <Box sx={{flex: 2}}>
            <IntlMessages id='website.auctionsName' />
          </Box>

          <Box sx={{flex: 2}}>
            <IntlMessages id='website.auctionsStart' />
          </Box>
          <Box sx={{flex: 1.5, display: {xs: 'none', lg: 'block'}}}>
            <IntlMessages id='website.auctionsEnd' />
          </Box>
          <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}}}>
            <IntlMessages id='website.auctionsList' />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AuctionListItem = ({items, user}) => {
  return <>{items.length == 0 ? <></> : <Head />}</>;
};
export default AuctionListItem;

AuctionListItem.propTypes = {
  items: PropTypes.array,
  user: PropTypes.object,
};
