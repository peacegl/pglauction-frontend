import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import {Box, Card, CardContent, Stack} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import AppList from '@crema/core/AppList';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import React from 'react';

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
        <IntlMessages id='website.image' />
      </Box>
      <CardContent sx={{flex: {xs: 1, sm: 4, md: 4}}}>
        <Stack direction='row' spacing={2}>
          <Box sx={{flex: 2}}>
            <IntlMessages id='website.lot_info' />
          </Box>
          <Box sx={{flex: 1.5, display: {xs: 'none', lg: 'block'}}}>
            <IntlMessages id='website.vehicle_info' />
          </Box>
          <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}}}>
            <IntlMessages id='website.sale_info' />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ListView = ({list, loading, perPage}) => {
  return (
    <>
      <AppList
        data={list}
        renderRow={(item, index) => (
          <>
            {index == 0 && <Head key={index} />}
            <ListItem item={item} key={index + 1} />
          </>
        )}
        perPage={perPage}
        loading={loading}
        ListEmptyComponent={
          <ListEmptyResult
            content={loading ? 'Loading...' : 'No Vehicle Found'}
            title={'Vehicle List'}
          />
        }
      />
    </>
  );
};

export default ListView;

ListView.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  perPage: PropTypes.number,
};
