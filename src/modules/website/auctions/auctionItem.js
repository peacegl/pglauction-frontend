import {Button, Grid} from '@mui/material';
import {alpha, Box} from '@mui/system';
import CoinsInfo from './CoinsInfo';
import PropTypes from 'prop-types';
import {AppCard} from '@crema';
import MyTimer from './timer';
import moment from 'moment';
import 'moment-timezone';

const AuctionItem = ({items, user}) => {
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        {items.map((data, i) => {
          let time = moment
            .tz(
              data?.end_date,
              'YYYY-MM-DD HH:mm:ss',
              user?.timezone ? user.timezone : 'UTC',
            )
            .tz(user?.timezone ? user.timezone : moment.tz.guess())
            .format('YYYY-MM-DD hh:mm:ss A');

          let startTime = moment
            .tz(
              data?.start_date,
              'YYYY-MM-DD HH:mm:ss',
              user?.timezone ? user.timezone : 'UTC',
            )
            .tz(user?.timezone ? user.timezone : moment.tz.guess())
            .format('YYYY-MM-DD hh:mm:ss A');
          return (
            <Grid key={i} item lg={6} md={12} xs={12}>
              <Box>
                <AppCard
                  sxStyle={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.background.default,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <Box
                        component='h3'
                        sx={{
                          fontWeight: 'medium',
                          fontSize: 20,
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        {data?.location?.name}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      {/* <Box>
                        <Button
                          size='small'
                          sx={{
                            backgroundColor: (theme) =>
                              alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontWeight: 'light',
                            textTransform: 'capitalize',
                            paddingX: 5,
                            fontSize: 16,
                            '&:hover, &:focus': {
                              backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.15),
                              color: 'primary.main',
                            },
                            lineHeight: {xs: '16px', sm: '20px', xl: '26px'},
                          }}
                        >
                          View Sale List
                        </Button>
                      </Box> */}
                      <Box
                        sx={{
                          ml: 3,
                        }}
                      >
                        <Button
                          size='small'
                          variant='contained'
                          sx={{
                            paddingX: 5,
                            fontWeight: 'light',
                            textTransform: 'capitalize',
                            fontSize: 16,
                            lineHeight: {xs: '16px', sm: '20px', xl: '26px'},
                          }}
                        >
                          View live auction
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      component='p'
                      sx={{
                        fontSize: 18,
                        mb: 2,
                        textTransform: 'capitalize',
                      }}
                    >
                      {data?.name}
                    </Box>
                    {/* <Box
                      component='p'
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        whiteSpace: 'nowrap',
                        mb: 1,
                        textAlign: 'center',
                      }}
                    >
                      {time}
                    </Box> */}

                    <Box>
                      <Box
                        sx={{
                          fontSize: 18,
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        <MyTimer
                          expiryTimestamp={moment.tz(
                            data?.end_date,
                            'YYYY-MM-DD HH:mm:ss',
                            'UTC',
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <CoinsInfo
                    coins={[
                      {
                        id: 1,
                        name: 'Total Vehicles',
                        value: `${data?.items_count} total`,
                      },
                      {id: 2, name: 'Status', value: 'Up coming'},
                      {id: 3, name: 'Start Date', value: `${startTime}`},
                      {id: 4, name: 'End Date', value: `${time}`},
                    ]}
                  />
                </AppCard>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AuctionItem;

AuctionItem.propTypes = {
  items: PropTypes.array,
  user: PropTypes.object,
};
