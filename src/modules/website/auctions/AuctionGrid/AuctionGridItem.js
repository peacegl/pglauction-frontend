import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Box} from '@mui/material';
import AuctionsInfo from './AuctionsInfo';
import PropTypes from 'prop-types';
import {AppCard} from '@crema';
import MyTimer from '../timer';
import moment from 'moment';
import 'moment-timezone';

const AuctioGridItem = ({item, user}) => {
  let endTime = moment(
    item?.end_date,
    'YYYY-MM-DD HH:mm:ss',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  let startTime = moment(
    item?.start_date,
    'YYYY-MM-DD HH:mm:ss',
    user?.timezone ? user.timezone : 'UTC',
  )
    .tz(user?.timezone ? user.timezone : moment.tz.guess())
    .format('YYYY-MM-DD hh:mm:ss A');

  return (
    <Box>
      <AppCard
        sxStyle={{
          borderRadius: 1,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.background.default,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{flex: 1}}>
            <Box
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id='common.location' />
            </Box>
            <Box
              component='h3'
              sx={{
                fontWeight: 'medium',
                fontSize: 20,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {item?.location?.name}
            </Box>
          </Box>
          <Box>
            <Button
              variant='contained'
              sx={{
                px: 5,
              }}
            >
              <IntlMessages id='auction.viewList' />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Box>
            <Box
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id='common.name' />
            </Box>
            <Box
              component='p'
              sx={{
                fontSize: 18,
                mb: 2,
                textTransform: 'capitalize',
              }}
            >
              {item?.name}
            </Box>
          </Box>
          <Box>
            <Box
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id='auction.endsIn' />
            </Box>
            <Box
              sx={{
                fontSize: 16,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              <MyTimer
                expiryTimestamp={moment.tz(
                  item?.end_date,
                  'YYYY-MM-DD HH:mm:ss',
                  'UTC',
                )}
              />
            </Box>
          </Box>
        </Box>
        <AuctionsInfo
          items={[
            {
              id: 1,
              name: 'Total Vehicles',
              value: `${item?.items_count} total`,
            },
            {id: 3, name: 'Start Date', value: `${startTime}`},
            {id: 4, name: 'End Date', value: `${endTime}`},
          ]}
        />
      </AppCard>
    </Box>
  );
};

export default AuctioGridItem;

AuctioGridItem.propTypes = {
  item: PropTypes.any,
  user: PropTypes.object,
};
