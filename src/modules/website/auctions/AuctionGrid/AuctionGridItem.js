import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Box, Typography} from '@mui/material';
import AuctionsInfo from './AuctionsInfo';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AppCard} from '@crema';
import MyTimer from '../timer';
import moment from 'moment';
import 'moment-timezone';

const AuctioGridItem = ({item, user}) => {
  const [isStarted, setIsStarted] = useState(false);
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

  useEffect(() => {
    setIsStarted(moment().isAfter(startTime));
  }, []);

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
            <Typography
              component='p'
              noWrap={true}
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id='common.location' />
            </Typography>
            <Typography
              component='h3'
              noWrap={true}
              sx={{
                fontWeight: 'medium',
                fontSize: 20,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {item?.location?.name}
            </Typography>
          </Box>
          <Box>
            <Button
              variant='contained'
              sx={{
                mt: 2,
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
            <Typography
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
              noWrap={true}
            >
              <IntlMessages id='common.name' />
            </Typography>
            <Typography
              component='p'
              sx={{
                fontSize: 18,
                mb: 2,
                textTransform: 'capitalize',
              }}
              noWrap={true}
            >
              {item?.name}
            </Typography>
          </Box>
          <Box>
            <Typography
              component='p'
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
              noWrap={true}
            >
              {isStarted ? (
                <IntlMessages id='auction.endsIn' />
              ) : (
                <IntlMessages id='auction.startsIn' />
              )}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                color: (theme) => theme.palette.primary.main,
              }}
              noWrap={true}
            >
              {isStarted && (
                <MyTimer
                  expiryTimestamp={moment.tz(
                    item?.end_date,
                    'YYYY-MM-DD HH:mm:ss',
                    'UTC',
                  )}
                  onExpire={() => {}}
                />
              )}
              {!isStarted && (
                <MyTimer
                  expiryTimestamp={moment.tz(
                    item?.start_date,
                    'YYYY-MM-DD HH:mm:ss',
                    'UTC',
                  )}
                  onExpire={() => {}}
                />
              )}
            </Typography>
          </Box>
        </Box>
        <AuctionsInfo
          items={[
            {
              id: 1,
              name: <IntlMessages id='common.totalVehicles' />,
              value: `${item?.items_count} total`,
            },
            {
              id: 3,
              name: <IntlMessages id='common.startDate' />,
              value: `${startTime}`,
            },
            {
              id: 4,
              name: <IntlMessages id='common.endDate' />,
              value: `${endTime}`,
            },
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
