import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import AppGrid from '@crema/core/AppGrid';
import GridItem from './GridItem';
import PropTypes from 'prop-types';
import React from 'react';

const GridView = ({list, loading, perPage}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    }}
    data={list}
    renderRow={(item, index) => (
      <GridItem item={item} key={index} url='vehicles' />
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
);
export default GridView;

GridView.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  perPage: PropTypes.number,
};
