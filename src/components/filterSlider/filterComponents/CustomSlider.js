import {Box, Slider} from '@mui/material';
import PropTypes from 'prop-types';

const CustomSlider = ({
  range,
  value,
  setValue,
  minTitle,
  maxTitle,
  onlyTitle,
  step = 1,
}) => {
  return (
    <Box sx={{mt: 5}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>{onlyTitle ? minTitle : `${value[0]} ${minTitle}`}</Box>
        <Box>{onlyTitle ? maxTitle : `${value[1]} ${maxTitle}`}</Box>
      </Box>
      <Box sx={{mx: 2}}>
        <Slider
          min={range[0]}
          max={range[1]}
          value={value}
          step={step}
          onChange={(e, value) => setValue(value)}
        />
      </Box>
    </Box>
  );
};

export default CustomSlider;
CustomSlider.propTypes = {
  range: PropTypes.array,
  value: PropTypes.array,
  minTitle: PropTypes.string,
  maxTitle: PropTypes.string,
  onlyTitle: PropTypes.bool,
  step: PropTypes.number,
  setValue: PropTypes.func,
};
