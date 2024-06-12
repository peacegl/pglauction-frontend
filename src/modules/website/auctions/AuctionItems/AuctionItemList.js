import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import IntlMessages from '@crema/utility/IntlMessages';
import {onGetWebAuctionItemsData} from 'redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthUser} from '@crema/utility/AuthHooks';
import React, {useEffect, useState} from 'react';
import ListHeader from 'components/design/ListHeader';
import GridView from './GridView/index';
import AppsContent from './AppsContent';
import {useRouter} from 'next/router';


import {
  alpha,
  Box,
  Card,
  Pagination,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'; 
import {async} from '@firebase/util';

const AuctionItemList = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const {user} = useAuthUser();
  const router = useRouter();
  const [back, setBack] = useState(true);
  const {id} = router.query;
  const {data = [], total} = useSelector(({webAuctions}) => {
    return webAuctions.auction;
  });
  const loading = useSelector(({webAuctions}) => webAuctions.loading);
  // const filterData = useSelector(({webAuctions}) => webAuctions.filterData);

  const {search = ''} = useSelector(({webAuctions}) => webAuctions);
  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [dispatch, id, page, search, perPage, user?.type]);

  const fetchData = async () => {
    await dispatch(
      onGetWebAuctionItemsData(id, {
        per_page: perPage,
        page: page + 1,
        search,
      }),
    );
  };

  const onPageChange = (event, value) => {
    setPage(value);
  };
  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    window.echo.channel(`web.auction_items.${id}`).listen('Web', (e) => {
      if (e.action === 'sync') {
        fetchData();
      }
    });
    return () => {
      const echoChannel = window.echo.channel(`web.auction_items.${id}`);
      echoChannel.stopListening('Web');
      window.echo.leave(`web.auction_items.${id}`);
    };
  }, []);

  return (
    <>
      <ListHeader
        onBack={() => {
          if (back) {
            router.back();
            setBack(false);
          }
        }}
        name={data[0]?.name}
        title='website.saleList'
        list={data}
        page={page}
        perPage={perPage}
        total={data.length}
        onPageChange={onPageChange}
      />
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
          <GridView list={data} perPage={perPage} loading={loading} />
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

export default AuctionItemList;
