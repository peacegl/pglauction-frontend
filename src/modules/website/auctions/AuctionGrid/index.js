import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import AuctionGridItem from './AuctionGridItem';
import AppGrid from '@crema/core/AppGrid';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {EXPIRE_AUCTION} from 'shared/constants/ActionTypes';

const AuctionGrid = ({
  list,
  loading,
  perPage,
  emptyContent,
  emptyTitle,
  user,
  expGParent,
}) => {
  const expParent = (id) => {
    expGParent(id);
  };

  return (
    <AppGrid
      responsive={{
        xs: 1,
        sm: 1,
        lg: 2,
      }}
      data={list}
      renderRow={(item, index) => (
        <AuctionGridItem item={item} key={index} user={user} exp={expParent} />
      )}
      perPage={perPage}
      ListEmptyComponent={
        <ListEmptyResult
          content={loading ? 'Loading...' : emptyContent}
          title={emptyTitle}
        />
      }
    />
  );
};

export default AuctionGrid;

AuctionGrid.propTypes = {
  list: PropTypes.array,
  user: PropTypes.any,
  loading: PropTypes.bool,
  perPage: PropTypes.number,
  emptyContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  emptyTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  user: PropTypes.any,
  expGParent: PropTypes.any,
};
