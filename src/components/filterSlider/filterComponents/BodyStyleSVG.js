import {Box} from '@mui/material';
import PropTypes from 'prop-types';

const BodyStyleSVG = (props) => {
  return (
    <Box
      onClick={() => props.handleClick(props.item.value)}
      sx={{
        cursor: 'pointer',
        width: {
          xs: '65px',
          md: '70px',
          xl: '80px',
        },
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          height: {xs: '55px', md: '60px', xl: '65px'},
        }}
      >
        {props.item.icon}
      </Box>
      <Box sx={{textAlign: 'center'}}>{props.item.title}</Box>
    </Box>
  );
};

export default BodyStyleSVG;
BodyStyleSVG.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};
