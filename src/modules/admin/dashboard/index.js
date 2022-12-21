import {AppAnimate} from '@crema';
import {Box, Skeleton} from '@mui/material';
import CardState from 'components/design/CardState';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminCounts} from 'redux/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {loading = false} = useSelector(({common}) => common);
  const {vehicles = {}} = useSelector(({common}) => common.counts);
  useEffect(() => {
    dispatch(getAdminCounts());
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'center',
            columnGap: 5,
            rowGap: 3,
            flexWrap: 'wrap',

            pb: {xs: 5, md: 8},
          }}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              sx={{
                flex: '1 1 15%',
                backgroundColor: (theme) => theme.palette.primary.contrastText,
                borderRadius: 5,
              }}
              animation='wave'
              variant='rounded'
              height={90}
            />
          ))}
        </Box>
      ) : (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box
            sx={{
              display: 'flex',
              // alignItems: 'center',
              columnGap: 5,
              rowGap: 3,
              flexWrap: 'wrap',

              pb: {xs: 5, md: 8},
            }}
          >
            <Box component='span' sx={{flex: '1 1 15%'}}>
              <CardState
                item={{
                  title: 'All Vehicles',
                  count: vehicles.all,
                  color: '#9E49E6',
                  icon: 'AL',
                }}
              />
            </Box>
            <Box component='span' sx={{flex: '1 1 15%'}}>
              <CardState
                item={{
                  title: 'Future Vehicles',
                  count: vehicles.future,
                  color: '#ff9800',
                  icon: 'F',
                }}
              />
            </Box>
            <Box component='span' sx={{flex: '1 1 15%'}}>
              <CardState
                item={{
                  title: 'Available Vehicle',
                  count: vehicles.available,
                  color: '#4caf50',
                  icon: 'AV',
                }}
              />
            </Box>
            <Box component='span' sx={{flex: '1 1 15%'}}>
              <CardState
                item={{
                  title: 'Sold Vehicles',
                  count: vehicles.sold,
                  color: '#b23c17',
                  icon: 'S',
                }}
              />
            </Box>
            <Box component='span' sx={{flex: '1 1 15%'}}>
              <CardState
                item={{
                  title: 'Inactive Vehicles',
                  count: vehicles.inactive,
                  color: '#009688',
                  icon: 'IN',
                }}
              />
            </Box>
          </Box>
        </AppAnimate>
      )}
    </>
  );
}
