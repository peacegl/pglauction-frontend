import React from 'react';
import AppGrid from '../../../../@crema/core/AppGrid';
import GridItem from './GridItem';
import AuctionGridItem from './AuctionGridItem';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

const AuctionGrid = ({list, loading}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 2,
      md: 3,
      xl: 4,
    }}
    data={list}
    renderRow={(item) => <AuctionGridItem item={item} key={item.id} />}
    ListEmptyComponent={
      <ListEmptyResult content='No product found' loading={loading} />
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
