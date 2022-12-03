import React from 'react';

import ListItem from './ListItem';
import AppList from '@crema/core/AppList';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, Stack, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import {useTheme} from '@mui/material';
import {AppLoader} from '@crema';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
const Head = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'row', sm: 'row'},
        alignItems: 'center',
        mb: 2,
        px: 2,
        maxWidth: '100%',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        fontWeight: 'bold',
      }}
    >
      <Box sx={{width: {xs: '160px', sm: '210px'}}} overflow='hidden'>
        Image
      </Box>
      <CardContent sx={{width: '100%'}}>
        <Stack direction='row' spacing={2}>
          <Box sx={{flex: 2}}>Lot Info</Box>
          <Box sx={{flex: 1.5, display: {xs: 'none', md: 'block'}}}>
            Vehicle Info
          </Box>
          <Box sx={{flex: 1, display: {xs: 'none', sm: 'block'}}}>
            Sale Info
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ListView = ({list, loading}) => {
  return (
    <>
      <AppList
        data={list}
        renderRow={(item, index) => (
          <>
            {index == 0 && <Head />}
            <ListItem item={item} key={item.id} />{' '}
          </>
        )}
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
};
