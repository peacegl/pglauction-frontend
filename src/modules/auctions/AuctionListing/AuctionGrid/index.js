import React from 'react';
import AppGrid from '../../../../@crema/core/AppGrid';
import GridItem from './GridItem';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

const ProductGrid = ({ecommerceList, loading}) => (
  <AppGrid
    delay={200}
    responsive={{
      xs: 1,
      sm: 2,
      xl: 3,
    }}
    data={ecommerceList}
    renderRow={(item) => <GridItem item={item} key={item.id} />}
    ListEmptyComponent={
      <ListEmptyResult content='No product found' loading={loading} />
    }
  />
);
// ecommerceList.map((item, index) => (
//   <Grid item xs={12} sm={6} md={4} key={index}>
//     <GridItem item={item} key={item.id} />
//   </Grid>
// ));
export default ProductGrid;

ProductGrid.propTypes = {
  ecommerceList: PropTypes.array,
  loading: PropTypes.bool,
};
