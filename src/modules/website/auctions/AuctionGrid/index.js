import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import AuctionGridItem from './AuctionGridItem';
import AppGrid from '@crema/core/AppGrid';
import PropTypes from 'prop-types';
import React from 'react';

const AuctionGrid = ({list, loading, perPage}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 1,
      lg: 2,
    }}
    data={list}
    renderRow={(item, index) => (
      <AuctionGridItem item={item} key={index} url='vehicles' />
    )}
    perPage={perPage}
    ListEmptyComponent={
      <ListEmptyResult
        content={loading ? 'Loading...' : 'No Auction For Today'}
        title={'Auction List'}
      />
    }
  />
);
export default AuctionGrid;

AuctionGrid.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  perPage: PropTypes.number,
};
