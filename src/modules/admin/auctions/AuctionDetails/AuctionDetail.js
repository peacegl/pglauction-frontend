import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Item from 'components/design/Item';
import List from '@mui/material/List';
import PropTypes from 'prop-types';

export default function AuctionDetail({auction}) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 1,
        m: 0,
        height: '650px',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
          position: 'sticky',
          zIndex: 1,
          top: 0,
          p: 3,
        }}
        title={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
          >
            <IntlMessages id='auction.auctionInfo' />
          </Typography>
        }
      />
      <CardContent sx={{px: 3, py: 0}}>
        <List sx={{width: '100%', bgcolor: 'background.paper', pb: 0}}>
          <Item
            label={<IntlMessages id='common.code' />}
            value={auction?.str_code}
          />
          <Item
            label={<IntlMessages id='common.location' />}
            value={auction?.location?.name}
          />
          <Item
            label={<IntlMessages id='common.name' />}
            value={auction?.name}
          />
          <Item
            label={<IntlMessages id='common.startDate' />}
            value={auction?.start_date}
          />
          <Item
            label={<IntlMessages id='common.endDate' />}
            value={auction?.end_date}
          />
          <Item
            label={<IntlMessages id='common.status' />}
            value={auction?.status}
            capitalizeValue
          />
          <Item
            label={<IntlMessages id='auction.totalItems' />}
            value={auction?.items_count}
          />
          {auction?.created_at && (
            <Item
              label={<IntlMessages id='common.created_at' />}
              value={auction?.created_at}
            />
          )}
          {auction?.created_by?.loginable?.fullname && (
            <Item
              label={<IntlMessages id='common.created_by' />}
              value={auction?.created_by?.loginable?.fullname}
            />
          )}
          {auction?.updated_at && (
            <Item
              label={<IntlMessages id='common.updated_at' />}
              value={auction?.updated_at}
            />
          )}
          {auction?.updated_by?.loginable?.fullname && (
            <Item
              label={<IntlMessages id='common.updated_by' />}
              value={auction?.updated_by?.loginable?.fullname}
            />
          )}
          {auction?.deleted_at && (
            <Item
              label={<IntlMessages id='common.deleted_at' />}
              value={auction?.deleted_at}
            />
          )}
          {auction?.deleted_by?.loginable?.fullname && (
            <Item
              label={<IntlMessages id='common.deleted_by' />}
              value={auction?.deleted_by?.loginable?.fullname}
            />
          )}
        </List>
      </CardContent>
    </Card>
  );
}

AuctionDetail.propTypes = {
  auction: PropTypes.any,
};
