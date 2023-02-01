import {AppCard} from '@crema';
import {Button, Card, Grid} from '@mui/material';
import {alpha, Box} from '@mui/system';
import CoinsInfo from './CoinsInfo';
import MyTimer from './timer';

const AuctionItem = ({items}) => {
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        {items.map((data, i) => (
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
                    <Box
                      component='p'
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        whiteSpace: 'nowrap',
                        mb: 1,
                        textTransform: 'capitalize',
                      }}
                    >
                      {data?.location?.slug}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Box>
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
                    </Box>
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
                      color: (theme) => theme.palette.primary.main,
                      mb: 2,
                      textTransform: 'capitalize',
                    }}
                  >
                    {data?.name}
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <MyTimer expiryTimestamp={new Date(data?.end_date)} />
                    </Box>
                    <Box
                      component='p'
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        whiteSpace: 'nowrap',
                        mb: 1,
                        textAlign: 'center',
                      }}
                    >
                      {data?.start_date}
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
                    {id: 2, name: 'Status', value: 'Up coming || Bidding'},
                  ]}
                />
              </AppCard>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuctionItem;
