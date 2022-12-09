import HatchBackIcon from '../../assets/icon/body_styles/hatchback2.svg';
import SedanIcon from '../../assets/icon/body_styles/sedan.svg';
import SuvIcon from '../../assets/icon/body_styles/suv.svg';
import CoupeIcon from '../../assets/icon/body_styles/coupe3.svg';
import ConvertibleIcon from '../../assets/icon/body_styles/convertible2.svg';
import WagonIcon from '../../assets/icon/body_styles/wagon2.svg';
import PickupIcon from '../../assets/icon/body_styles/pickup3.svg';
import MinivanIcon from '../../assets/icon/body_styles/minivan.svg';
import VanIcon from '../../assets/icon/body_styles/van.svg';
import {useDispatch} from 'react-redux';
import {Box} from '@mui/material';
import BodyStyleSVG from './filterComponents/BodyStyleSVG';
import {useTheme} from '@mui/material';
import PropTypes from 'prop-types';

const BodyStyle = ({reduxReducer, data, columnName}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const bodyStyles = [
    {
      id: 1,
      title: 'Sedan',
      value: 'sedan',
      icon: (
        <SedanIcon
          fill={
            data[columnName].includes('sedan')
              ? theme.palette.primary.main
              : data[columnName].includes('sedan')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 2,
      title: 'SUV',
      value: 'suv',
      icon: (
        <SuvIcon
          fill={
            data[columnName].includes('suv')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 3,
      title: 'Coupe',
      value: 'coupe',
      icon: (
        <CoupeIcon
          fill={
            data[columnName].includes('coupe')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 4,
      title: 'Hatchback',
      value: 'hatchback',
      icon: (
        <HatchBackIcon
          fill={
            data[columnName].includes('hatchback')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 5,
      title: 'Convertible',
      value: 'convertible',
      icon: (
        <ConvertibleIcon
          fill={
            data[columnName].includes('convertible')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 6,
      title: 'Wagon',
      value: 'wagon',
      icon: (
        <WagonIcon
          fill={
            data[columnName].includes('wagon')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 7,
      title: 'Pickup',
      value: 'pickup',
      icon: (
        <PickupIcon
          fill={
            data[columnName].includes('pickup')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 8,
      title: 'Minivan',
      value: 'minivan',
      icon: (
        <MinivanIcon
          fill={
            data[columnName].includes('minivan')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
    {
      id: 9,
      title: 'Van',
      value: 'van',
      icon: (
        <VanIcon
          fill={
            data[columnName].includes('van')
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ),
    },
  ];

  const handleClick = (value) => {
    !data[columnName].includes(value)
      ? dispatch(
          reduxReducer({
            ...data,
            [columnName]: [...data[columnName], value],
          }),
        )
      : dispatch(
          reduxReducer({
            ...data,
            [columnName]: data[columnName].filter((item) => item != value),
          }),
        );
  };
  return (
    <Box sx={{px: 3}}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {bodyStyles.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: '0 1 33%',
              display: 'flex',
              justifyContent: 'center',
              color: data[columnName].includes(item.value)
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            }}
          >
            <BodyStyleSVG item={item} key={item.id} handleClick={handleClick} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BodyStyle;
BodyStyle.propTypes = {
  reduxReducer: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  columnName: PropTypes.string.isRequired,
  items: PropTypes.array,
  hideSearch: PropTypes.bool,
  customColumn: PropTypes.string,
};
