import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAuctionItemBid} from 'redux/actions';

import {AppList, AppMenu} from '@crema';
import {Box} from '@mui/system';
import {Avatar, TableCell, TableRow} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';

// const ScrollbarWrapper = styled(SimpleBarReact)(() => {
//   return {
//     display: 'flex',
//     flexDirection: 'column',
//     height: `calc(100% - 400px)`,
//   };
// });

const BidItemHistory = ({id}) => {
  const dispatch = useDispatch();
  const loading = useSelector(({common}) => common.loading);
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemBid,
  );
  const [page, setPage] = useState(0);
  const _scrollBarRef = useRef();

  useEffect(() => {
    fetchData(id);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      if (_scrollBarRef.current) {
        console.log(_scrollBarRef);
        _scrollBarRef.current.scrollIntoView({
          behaviour: 'smooth',
        });
      }
    }
  }, [data]);

  const fetchData = async (id) => {
    await dispatch(
      onGetAuctionItemBid(id, {
        per_page: 10,
        page: page + 1,
        orderBy: {column: 'created_at', order: 'asc'},
      }),
    );
  };

  return (
    <Box
      sx={{
        height: '300px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: `calc(100% - 400px)`,
        }}
      >
        <AppList
          animation='transition.slideUpIn'
          data={data}
          renderRow={(data, index) => {
            return (
              <TableRow
                key={data?.id}
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
                      {data?.buyer.username}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {data.id}
                </TableCell>
                {/* <TableCell align='left' className='tableCell'>
                  {data.weight}
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {data.assignedDr}
                </TableCell>
                <TableCell align='left'>{data.date}</TableCell> */}
                <TableCell align='left'>
                  <Box
                    sx={{
                      // color: data.color,
                      // backgroundColor: data.color + '44',
                      padding: '3px 10px',
                      borderRadius: 1,
                      display: 'inline-block',
                      fontSize: 13,
                    }}
                  >
                    {data.status}
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  <AppMenu />
                </TableCell>
              </TableRow>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default BidItemHistory;

BidItemHistory.propTypes = {
  id: PropTypes.any,
};
