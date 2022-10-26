import {Card, Typography, Badge, Box} from '@mui/material';
import PropTypes from 'prop-types';

const DataTableHeader = (props) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        p: 4,
        mb: 3,
      }}
      variant='outlined'
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h2'
          color='primary'
          sx={{
            mr: 8,
          }}
        >
          {props.title}
        </Typography>
        <Badge
          badgeContent={props.total}
          color='primary'
          max={9999999999}
          showZero
        />
      </Box>
    </Card>
  );
};

export default DataTableHeader;

DataTableHeader.propTypes = {
  title: PropTypes.title,
  total: PropTypes.total,
};
