import IntlMessages from '@crema/utility/IntlMessages';
import AppLoader from '@crema/core/AppLoader';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getData} from 'configs';
import {Box, alpha} from '@mui/material';

const BorderedItems = ({
  url,
  reduxReducer,
  data,
  columnName,
  items,
  customColumn = null,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);
  const [valuesLoading, setValuesLoading] = useState(false);

  useEffect(() => {
    if (url) {
      getData(url, {}, setValuesLoading, setValues);
    } else if (items) {
      setValues(items);
    }
  }, []);

  const handleClick = (e, id) => {
    !data[columnName].includes(id)
      ? dispatch(
          reduxReducer({
            ...data,
            [columnName]: [...data[columnName], id],
          }),
        )
      : dispatch(
          reduxReducer({
            ...data,
            [columnName]: data[columnName].filter((item) => item != id),
          }),
        );
  };
  return (
    <Box
      sx={{
        mx: 2,
        my: 3,
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {values.map((item, index) => (
          <Box
            onClick={(e) => handleClick(e, item.id)}
            key={index}
            sx={{
              cursor: 'pointer',
              border: (theme) =>
                `1px solid ${
                  data[columnName]?.includes(item.id)
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }`,
              color: (theme) =>
                data[columnName]?.includes(item.id)
                  ? theme.palette.primary.main
                  : 'inherit',
              bgcolor: (theme) =>
                data[columnName]?.includes(item.id)
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'inherit',
              px: 3,
              py: 1,
              mb: 3,
              ml: 2,
              borderRadius: 10,
            }}
          >
            {customColumn ? item[customColumn] : item.name}
          </Box>
        ))}
      </Box>
      {valuesLoading && <AppLoader />}
    </Box>
  );
};

export default BorderedItems;
BorderedItems.propTypes = {
  url: PropTypes.any,
  reduxReducer: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  columnName: PropTypes.string.isRequired,
  items: PropTypes.array,
  hideSearch: PropTypes.bool,
  customColumn: PropTypes.string,
};
