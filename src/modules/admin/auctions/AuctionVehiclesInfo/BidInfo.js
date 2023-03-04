import PropTypes from 'prop-types';

const {getFormattedDateTime} = require('@crema/utility/helper/DateHelper');
const {default: IntlMessages} = require('@crema/utility/IntlMessages');
const {Card, CardHeader, Typography, CardContent} = require('@mui/material');
const {Box, alpha} = require('@mui/system');
const {default: Item} = require('components/design/Item');
const {moneyFormater} = require('configs');

const BidInfoAdmin = ({bid}) => {
  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0, minHeight: 340}}>
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
            <IntlMessages id='auction.bidInfo' />
          </Typography>
        }
      />
      <CardContent
        sx={{
          py: 0,
        }}
      >
        <Box>
          <Item
            label={<IntlMessages id='bid.minimum_bid' />}
            value={moneyFormater(bid?.minimum_bid)}
          />
          <Item
            label={<IntlMessages id='common.buy_now_price' />}
            value={moneyFormater(bid?.buy_now_price)}
          />
          <Item
            label={<IntlMessages id='common.status' />}
            value={bid?.status}
          />

          <Item
            label={<IntlMessages id='common.created_by' />}
            value={bid?.created_by.username}
          />

          <Item
            label={<IntlMessages id='common.created_at' />}
            value={getFormattedDateTime(bid?.created_at)}
          />

          <Item
            label={<IntlMessages id='common.updated_by' />}
            value={bid?.updated_by.username ?? ''}
          />

          <Item
            label={<IntlMessages id='common.updated_at' />}
            value={bid?.updated_at ? getFormattedDateTime(bid?.updated_at) : ''}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
export default BidInfoAdmin;
BidInfoAdmin.propTypes = {
  bid: PropTypes.any,
};
