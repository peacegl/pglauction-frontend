import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';

import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import TableHeading from 'components/CustomTableHeading/TableHeading';

const DealsTable = (props) => {
  const {dealsTableData} = props;

  const header = [
    {id: 'common.code'},
    {id: 'common.image', align: 'left'},
    {id: 'common.vin', align: 'left'},
    {id: 'common.lot_number', align: 'left'},
    {id: 'common.minimum_bid', align: 'left'},
    {id: 'common.buy_now_price', align: 'left'},
    {id: 'common.bid_status', align: 'left'},
    {id: 'common.totalCost', align: 'left'},
    {id: 'common.saleRate', align: 'left'},
    {id: 'common.price', align: 'left'},
    {id: 'common.year', align: 'left'},
    {id: 'common.make', align: 'left'},
    {id: 'sidebar.mui.util.modal', align: 'left'},
    {id: 'common.status', align: 'left'},
    {id: 'vehicle.exterior_color', align: 'left'},
    {id: 'vehicle.interior_color', align: 'left'},
    {id: 'vehicle.primary_damage', align: 'left'},
    {id: 'vehicle.is_featured', align: 'left'},
    {id: 'vehicle.is_best_selling', align: 'left'},
    {id: 'common.engine_type', align: 'left'},
    {id: 'vehicle.odometer', align: 'left'},
    {id: 'vehicle.transmission', align: 'left'},
    {id: 'common.created_by', align: 'left'},
    {id: 'common.updated_by', align: 'left'},
  ];

  return (
    <AppTableContainer sxStyle={{height: '500px'}}>
      <Table stickyHeader className='table'>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading header={header} />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {dealsTableData.map((row) => (
            <TableItem row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default DealsTable;

DealsTable.defaultProps = {
  dealsTableData: [],
};

DealsTable.propTypes = {
  dealsTableData: PropTypes.array,
};
