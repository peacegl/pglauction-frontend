import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import MinMax from './MinMax';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

const MinMaxFilter = ({
  value,
  reduxReducer,
  data,
  columnName,
  select = false,
  items,
}) => {
  const dispatch = useDispatch();
  const onSetValue = (updatedValue) => {
    dispatch(
      reduxReducer({
        ...data,
        [columnName]: updatedValue,
      }),
    );
  };
  return (
    <Box
      sx={{
        mx: 2,
        my: 3,
      }}
    >
      <MinMax
        select={select}
        value={value}
        setValue={onSetValue}
        items={items}
      />
    </Box>
  );
};

export default MinMaxFilter;
MinMaxFilter.propTypes = {
  value: PropTypes.object,
  reduxReducer: PropTypes.func,
  data: PropTypes.any,
  columnName: PropTypes.string,
  select: PropTypes.bool,
  items: PropTypes.array,
};
