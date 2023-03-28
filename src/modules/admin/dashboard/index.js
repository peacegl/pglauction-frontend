import {AppAnimate, AppGridContainer} from '@crema';
import {Box, Grid, Skeleton} from '@mui/material';
import CardState from 'components/design/CardState';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminCounts} from 'redux/actions';
import {onGetVehicleGraph} from 'redux/actions/Dashboard';
import BtcVolumeCurrency from './BtcVolumeCurrency';
import Vehicle from './vehicleGraph';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {loading = false} = useSelector(({common}) => common);
  const {vehicles = {}} = useSelector(({common}) => common.counts);

  const {vehiclesGraph = {}} = useSelector(({dashboard}) => dashboard);

  useEffect(() => {
    fetchData();
    dispatch(getAdminCounts());
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(onGetVehicleGraph());
  };

  const router = useRouter();

  const handleClick = (href, filterData) => {
    router.push({
      pathname: href,
      query: {filteredData: filterData},
    });
  };

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
            flexDirection: {xs: 'column', sm: 'row'},
            pb: {xs: 5, md: 8},
          }}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} component='span' sx={{flex: '1 1 15%'}}>
              <Skeleton
                sx={{
                  borderRadius: 5,
                  height: {xs: '85px', md: '90px'},
                }}
                animation='wave'
                variant='rounded'
              />
            </Box>
          ))}
        </Box>
      ) : (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box>
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
                  onClick={() => {
                    handleClick(`/admin/vehicles`);
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
                  onClick={() => {
                    handleClick(
                      '/admin/vehicles',
                      JSON.stringify({'vehicles.status': ['future']}),
                    );
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
                  onClick={() => {
                    handleClick(
                      '/admin/vehicles',
                      JSON.stringify({'vehicles.status': ['available']}),
                    );
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
                  onClick={() => {
                    handleClick(
                      '/admin/vehicles',
                      JSON.stringify({'vehicles.status': ['sold']}),
                    );
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
                  onClick={() => {
                    handleClick(
                      '/admin/vehicles',
                      JSON.stringify({'vehicles.status': ['inactive']}),
                    );
                  }}
                />
              </Box>
            </Box>
            <AppGridContainer>
              <Grid item xs={12}>
                <Vehicle coinGraphData={vehiclesGraph} />
              </Grid>
              <Grid item xs={12} md={4}>
                <BtcVolumeCurrency
                  data={[
                    {
                      id: 1001,
                      name: 'Future',
                      value: vehicles.future,
                      color: '#4299E1',
                    },
                    {
                      id: 1002,
                      name: 'Available',
                      value: vehicles.available,
                      color: '#38B2AC',
                    },
                    {
                      id: 1003,
                      name: 'Inactive',
                      value: vehicles.inactive,
                      color: '#E53E3E',
                    },
                    {
                      id: 1004,
                      name: 'Sold',
                      value: vehicles.sold,
                      color: '#4C51BF',
                    },
                  ]}
                />
              </Grid>
            </AppGridContainer>
          </Box>
        </AppAnimate>
      )}
    </>
  );
}
