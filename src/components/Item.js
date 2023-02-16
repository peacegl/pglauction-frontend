import {Box, colors, ListItem, Typography} from '@mui/material';
import {PropTypes} from 'prop-types';

export default function Item({label, value, ...rest}) {
  return (
    <ListItem
      key={value}
      sx={{
        borderBottom: 1,
        borderColor: colors.grey[300],
        py: 2,
        color: 'text.secondary',
        ...rest.sx,
      }}
      disablePadding
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography component='div' fontSize='14px' overflow='hidden'>
          {label}:
        </Typography>
        <Typography
          component='div'
          fontSize='14px'
          overflow='hidden'
          fontWeight='bold'
          align='right'
        >
          {value}
        </Typography>
      </Box>
    </ListItem>
  );
}

Item.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
};
