import IntlMessages from '@crema/utility/IntlMessages';
import SliderComponent from './CustomSlider';
import {Box, Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import MinMax from './MinMax';
import {useEffect, useState} from 'react';
import {moneyFormater} from 'configs';

const MinMaxSlider = ({
  value,
  minTitle,
  maxTitle,
  step,
  data,
  columnName,
  onlyTitle = false,
  price = false,
}) => {
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState(value);
  const [range, setRange] = useState([]);

  useEffect(() => {
    setRange(value);
  }, []);

  const onApply = () => {
    dispatch(
      reduxReducer({
        ...data,
        [columnName]: [...data[columnName], id],
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
      <MinMax value={dataValue} setValue={setDataValue} />
      <SliderComponent
        value={dataValue}
        range={range}
        minTitle={price ? moneyFormater(dataValue[0]) : minTitle}
        maxTitle={price ? moneyFormater(dataValue[1]) : maxTitle}
        onlyTitle={onlyTitle}
        step={step}
        setValue={setDataValue}
      />
      <Box sx={{display: 'flex', flexDirection: 'row-reverse', mt: 2}}>
        <Button variant='contained' size='small' sx={{px: 5}} onClick={onApply}>
          <IntlMessages id='common.apply' />
        </Button>
      </Box>
    </Box>
  );
};

export default MinMaxSlider;
MinMaxSlider.propTypes = {
  value: PropTypes.object,
  minTitle: PropTypes.string,
  maxTitle: PropTypes.string,
  step: PropTypes.number,
  data: PropTypes.array,
  columnName: PropTypes.string,
  onlyTitle: PropTypes.bool,
  price: PropTypes.bool,
};
