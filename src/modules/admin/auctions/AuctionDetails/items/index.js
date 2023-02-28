import {Card, CardActions, Pagination} from '@mui/material';

import PropTypes from 'prop-types';
import ItemsTable from './ItemsTable';

const ItemsData = ({data, total, perPage, setPage, page}) => {
  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  return (
    <Card
      sx={{
        px: 0,
        borderRadius: 1,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ItemsTable data={data} />
      <CardActions>
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page + 1}
          onChange={onPageChange2}
          color='primary'
        />
      </CardActions>
    </Card>
  );
};

export default ItemsData;

ItemsData.propTypes = {
  data: PropTypes.any,
  total: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};
