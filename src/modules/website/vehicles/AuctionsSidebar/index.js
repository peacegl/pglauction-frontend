import IntlMessages from '@crema/utility/IntlMessages';
import React, {useEffect, useState} from 'react';
import AuctionCategory from './AuctionsCategory';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Divider from '@mui/material/Divider';
import PriceSelector from './PriceSelector';
import AppScrollbar from '@crema/core/AppScrollbar';
import AppList from '@crema/core/AppList';
import CheckedCell from './CheckedCell';
import {
  BrandData,
  DiscountList,
  IdealFor,
  ProductColors,
} from '@crema/services/db/ecommerce/ecommerceData';
import AppGrid from '@crema/core/AppGrid';
import ColorCell from './ColorCell';
import RatingCell from './RatingCell';
import {useDispatch, useSelector} from 'react-redux';
import {setFilters} from '../../../../redux/actions';
import PropTypes from 'prop-types';
import FilterComponents from './FilterComponents';

const AuctionsSidebar = ({backgroundColor}) => {
  const dispatch = useDispatch();
  const filterData = useSelector(({webVehicles}) => webVehicles.filterData);
  const [selectedBrand, setSelectedBrand] = useState(filterData.brand);
  const [selectedFor, setSelectedFor] = useState(filterData.ideaFor);
  const [selectedDiscount, setSelectedDiscount] = useState(filterData.discount);
  const [selectedColor, setSelectedColor] = useState(filterData.color);
  const [customerRating, setCustomerRating] = useState(filterData.rating);

  useEffect(() => {
    dispatch(
      setFilters({
        title: filterData.title,
        brand: selectedBrand,
        ideaFor: selectedFor,
        discount: selectedDiscount,
        color: selectedColor,
        rating: customerRating,
      }),
    );
  }, [
    dispatch,
    filterData.title,
    selectedBrand,
    selectedFor,
    selectedDiscount,
    selectedColor,
    customerRating,
  ]);

  const onSelectBrand = (brandId) => {
    if (selectedBrand.some((brand) => brand === brandId)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== brandId));
    } else {
      setSelectedBrand(selectedBrand.concat(brandId));
    }
  };

  const onSelectFor = (id) => {
    if (selectedFor.some((item) => item === id)) {
      setSelectedFor(selectedFor.filter((item) => item !== id));
    } else {
      setSelectedFor(selectedFor.concat(id));
    }
  };

  const onSelectDiscount = (id) => {
    if (selectedDiscount.some((item) => item === id)) {
      setSelectedDiscount(selectedDiscount.filter((item) => item !== id));
    } else {
      setSelectedDiscount(selectedDiscount.concat(id));
    }
  };

  const onSelectColor = (id) => {
    if (selectedColor.some((item) => item === id)) {
      setSelectedColor(selectedColor.filter((item) => item !== id));
    } else {
      setSelectedColor(selectedColor.concat(id));
    }
  };

  const onSelectRating = (id) => {
    if (customerRating.some((item) => item === id)) {
      setCustomerRating(customerRating.filter((item) => item !== id));
    } else {
      setCustomerRating(customerRating.concat(id));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 2,
        }}
      >
        <Typography
          component='h3'
          sx={{fontSize: '18px', fontWeight: '500'}}
          color='primary'
        >
          <IntlMessages id='common.apply_filters' />
        </Typography>
        <Button onClick={() => {}}>
          <IntlMessages id='common.reset_all' />
        </Button>
      </Box>
      <Box>
        <FilterComponents filterData={filterData} />
      </Box>
    </Box>
  );
};

export default AuctionsSidebar;
AuctionsSidebar.propTypes = {
  backgroundColor: PropTypes.string,
};
