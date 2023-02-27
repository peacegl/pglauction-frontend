import React, {useEffect, useState} from 'react';
import ItemTable from './items_table';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAuctionItems} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {CardActions, Pagination} from '@mui/material';

const ItemsData = ({id}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemsData,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    // fetchData(id);
  }, [page]);

  const fetchData = async (id) => {
    await dispatch(
      onGetAuctionItems(id, {
        per_page: perPage,
        page: page + 1,
      }),
    );
  };

  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  return (
    <AppCard
      contentStyle={{
        px: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!loading ? (
        <ItemTable ticketSupportData={data} />
      ) : (
        <Box sx={{height: '350px'}}></Box>
      )}
      <CardActions>
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page + 1}
          onChange={onPageChange2}
          color='primary'
        />
      </CardActions>
    </AppCard>
  );
};

export default ItemsData;

ItemsData.propTypes = {
  id: PropTypes.any,
};
