import React from 'react';
import ListItem from './ListItem';
import AuctionListItem from './AuctionListItem';
import AppList from '@crema/core/AppList';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, Stack, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import {useTheme} from '@mui/material';
const Header = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: 'center',
        mb: 2,
        px: 2,
        maxWidth: {xs: '360px', sm: '100%'},
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        fontWeight: 'bold',
      }}
    >
      <Box width='210px' overflow='hidden'>
        Image
      </Box>
      <CardContent sx={{width: '100%'}}>
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
          <Box sx={{flex: 2}}>Lot Info</Box>
          <Box sx={{flex: 1}}>Vehicle Info</Box>
          <Box sx={{flex: 1}}>Sale Info</Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AuctionList = ({list, loading}) => {
  return (
    <>
      <AppList
        data={list}
        renderRow={(item, index) => (
          <>
            {index == 0 && <Header />}
            <AuctionListItem item={item} key={item.id} />{' '}
          </>
        )}
        ListEmptyComponent={
          <ListEmptyResult content='No product found' loading={loading} />
        }
      />
    </>
  );
};

export default AuctionList;

AuctionList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
};
