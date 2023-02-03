import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import AuctionGridItem from './AuctionGridItem';
import AppGrid from '@crema/core/AppGrid';
import PropTypes from 'prop-types';
import React from 'react';

const AuctionGrid = ({list, loading, perPage, emptyContent, emptyTitle}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 1,
      lg: 2,
    }}
    data={list}
    renderRow={(item, index) => <AuctionGridItem item={item} key={index} />}
    perPage={perPage}
    ListEmptyComponent={
      <ListEmptyResult
        content={loading ? 'Loading...' : emptyContent}
        title={emptyTitle}
      />
    }
  />
);
export default AuctionGrid;

AuctionGrid.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  perPage: PropTypes.number,
  emptyContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  emptyTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
