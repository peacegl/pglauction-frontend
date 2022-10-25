import React, {useEffect, useState} from 'react';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import ProductHeader from '../ProductHeader';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_TYPE} from '../../../redux/reducers/AuctionItems';
import ProductGrid from './ProductGrid/index';

import ProductList from './ProductList';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import {alpha, Box, Hidden} from '@mui/material';
import {useThemeContext} from '../../../@crema/utility/AppContextProvider/ThemeContextProvider';
import {onGetAuctionData, setFilters} from '../../../redux/actions';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsPagination from '../../../@crema/core/AppsPagination';

const ProductListing = () => {
  const dispatch = useDispatch();
  const {theme} = useThemeContext();
  const [page, setPage] = useState(0);

  const auctionItemsList = useSelector(
    ({auction_items}) => auction_items.auctionItemsList,
  );
  const {data = [], total = 0} = auctionItemsList;
  const viewType = useSelector(({auction_items}) => auction_items.viewType);
  const filterData = useSelector(({auction_items}) => auction_items.filterData);
  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    dispatch(onGetAuctionData({...filterData, page: page + 1}));
  }, [dispatch, filterData, page]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const searchProduct = (title) => {
    dispatch(setFilters({...filterData, title}));
  };
  return (
    <>
      <AppsHeader>
        <ProductHeader
          list={data}
          viewType={viewType}
          page={page}
          totalProducts={total}
          onPageChange={onPageChange}
          onSearch={searchProduct}
        />
      </AppsHeader>

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
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={data} loading={loading} />
          ) : (
            <ProductList ecommerceList={data} loading={loading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {data.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={total}
              rowsPerPage={10}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default ProductListing;
