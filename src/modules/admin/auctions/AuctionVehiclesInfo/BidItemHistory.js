import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAuctionItemBid} from 'redux/actions';

import {AppList, AppMenu} from '@crema';
import {Box} from '@mui/system';
import {
  Avatar,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Pagination,
} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';

import TableHeading from 'components/CustomTableHeading/TableHeading';
import {moneyFormater} from 'configs';
import {GET_AUCTION_ITEM_BID_EMPTY} from 'shared/constants/ActionTypes';

const BidItemHistory = ({id}) => {
  const dispatch = useDispatch();
  const loading = useSelector(({common}) => common.loading);
  const {
    data = [],
    total = 0,
    hasMore,
  } = useSelector(({auctions}) => auctions.auctionItemBid);
  const [page, setPage] = useState(0);
  const [fetch, setFetch] = useState(false);
  const _scrollBarRef = useRef();

  useEffect(() => {
    fetchData(id);
    console.log('kljklj');
  }, [page]);

  useEffect(() => {
    dispatch({type: GET_AUCTION_ITEM_BID_EMPTY});
  }, []);

  const fetchData = async (id) => {
    setFetch(true);
    await dispatch(
      onGetAuctionItemBid(id, {
        per_page: 10,
        page: page + 1,
        orderBy: {column: 'created_at', order: 'desc'},
      }),
    );
    setFetch(false);
  };

  const onScroll = () => {
    if (_scrollBarRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = _scrollBarRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (!fetch && hasMore) {
          setPage(page + 1);
        }
      }
    }
  };

  const header = [
    {id: 'common.customerInfo'},
    {id: 'bid.bid_amount'},
    {id: 'common.status'},
    {id: 'common.created_at'},
    {id: 'common.actions', align: 'center'},
  ];

  return (
    <div
      onScroll={onScroll}
      ref={_scrollBarRef}
      style={{height: '600px', overflowY: 'scroll'}}
    >
      <Table stickyHeader className='table' sx={{pb: 7, height: `100%`}}>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading header={header} />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {data.map((item, index) => {
            return (
              <TableRow
                key={index}
                sx={{
                  '& .tableCell': {
                    fontSize: 13,
                    padding: 2,
                    whiteSpace: 'nowrap',
                    '&:first-of-type': {
                      pl: 5,
                    },
                    '&:last-of-type': {
                      pr: 5,
                    },
                  },
                  width: '100%',
                }}
                className='item-hover'
              >
                <TableCell component='th' scope='row' className='tableCell'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 3.5,
                      }}
                    >
                      A
                    </Avatar>
                    <Box
                      sx={{
                        fontWeight: Fonts.MEDIUM,
                      }}
                    >
                      {item?.buyer.username}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {moneyFormater(item.amount)}
                </TableCell>

                <TableCell align='left' className='tableCell'>
                  {item.is_accepted == 0 ? 'No' : 'yes'}
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {item.created_at}
                </TableCell>
                <TableCell align='center'>
                  <AppMenu />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BidItemHistory;

BidItemHistory.propTypes = {
  id: PropTypes.any,
};
