import React, {useEffect, useState} from 'react';
import ItemTable from './ItemsTable';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAuctionItems} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {Card, CardActions, Pagination} from '@mui/material';

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
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 1,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!loading ? (
        <ItemTable ticketSupportData={data} />
      ) : (
        <Box sx={{height: '450px'}}></Box>
      )}
      <CardActions>
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page + 1}
          onChange={onPageChange2}
          color='primary'
        />
      </CardActions>
    </Card>
  );
};

export default ItemsData;

ItemsData.propTypes = {
  id: PropTypes.any,
};
