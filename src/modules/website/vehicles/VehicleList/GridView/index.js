import React from 'react';
import AppGrid from '@crema/core/AppGrid';
import GridItem from './GridItem';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

const AuctionGrid = ({list, loading}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 2,
      lg: 3,
      xl: 4,
    }}
    sx={{display: 'flex'}}
    data={list}
    renderRow={(item) => <GridItem item={item} key={item.id} url='vehicles' />}
    ListEmptyComponent={
      <ListEmptyResult
        content={loading ? 'Loading...' : 'No Vehicle Found'}
        title={'Vehicle List'}
      />
    }
  />
);
// list.map((item, index) => (
//   <Grid item xs={12} sm={6} md={4} key={index}>
//     <GridItem item={item} key={item.id} />
//   </Grid>
// ));
export default AuctionGrid;

AuctionGrid.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
};
