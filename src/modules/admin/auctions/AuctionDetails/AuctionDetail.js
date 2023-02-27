import {alpha, Card, CardContent, CardHeader, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Item from 'components/design/Item';
import List from '@mui/material/List';
import PropTypes from 'prop-types';

export default function AuctionDetail({auction}) {
  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <CardHeader
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
          color: 'white',
          p: 3,
        }}
        title={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
          >
            sdfsd
          </Typography>
        }
      />
      <CardContent sx={{px: 3, py: 0}}>
        <List sx={{width: '100%', bgcolor: 'background.paper', pb: 0}}>
          <Item label={'sss'} value={'sfdfsd'} />
        </List>
      </CardContent>
    </Card>
  );
}

AuctionDetail.propTypes = {
  auction: PropTypes.any,
};
