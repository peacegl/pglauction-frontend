import React from 'react';
import ListItem from './ListItem';
import AuctionListItem from './AuctionListItem';
import AppList from '../../../../@crema/core/AppList';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import PropTypes from 'prop-types';

const AuctionList = ({list, loading}) => {
  return (
    <AppList
      data={list}
      renderRow={(item) => <AuctionListItem item={item} key={item.id} />}
      ListEmptyComponent={
        <ListEmptyResult content='No product found' loading={loading} />
      }
    />
  );
};

export default AuctionList;

AuctionList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
};
