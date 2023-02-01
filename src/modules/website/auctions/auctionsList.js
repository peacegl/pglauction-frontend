import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppsContent from '../vehicles/VehicleList/AppsContent';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {onGetWebAuctionData} from 'redux/actions';
import React, {useEffect, useState} from 'react';
import Header from '../vehicles/Header/index';
import AuctionItem from './auctionItem';
import {
  alpha,
  Box,
  Card,
  Pagination,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

const AuctionsList = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const {user} = useAuthUser();
  const {data = [], total = 0} = useSelector(
    ({webAuctions}) => webAuctions.auctionsList,
  );
  const viewType = useSelector(({webAuctions}) => webAuctions.viewType);
  // const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    dispatch(
      onGetWebAuctionData({
        per_page: perPage,
        page: page + 1,
      }),
    );
  }, [dispatch, page, perPage, user?.type]);

  const onPageChange = (event, value) => {
    setPage(value);
  };
  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };
  return (
    <>
      <Card
        sx={{
          m: 3,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            padding: {
              xs: '4px 10px',
              xl: '12px 10px',
            },
          }}
          className='apps-header'
        >
          <Header
            title='website.todayAuctions'
            list={data}
            viewType={viewType}
            page={page}
            perPage={perPage}
            totalProducts={total}
            onPageChange={onPageChange}
          />
        </Box>
      </Card>

      <AppsContent
        style={{backgroundColor: alpha(theme.palette.background.default, 0.6)}}
      >
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            py: 2,
            px: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          <AuctionItem items={data} user={user} />
        </Box>
        {data.length > 0 && (
          <Box
            sx={{
              m: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                px: 3,
                borderRadius: 1,
                py: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant='body1' sx={{mr: 2}}>
                  <IntlMessages id='common.rowsPerPage' />:
                </Typography>
                <Select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(parseInt(e.target.value));
                    setPage(0);
                  }}
                  autoWidth
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    '.MuiOutlinedInput-notchedOutline': {border: 0},
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                </Select>
              </Box>
              <Pagination
                count={Math.ceil(total / perPage)}
                page={page + 1}
                onChange={onPageChange2}
                color='primary'
              />
            </Card>
          </Box>
        )}
      </AppsContent>
    </>
  );
};

export default AuctionsList;
