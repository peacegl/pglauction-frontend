import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import AppTableContainer from '@crema/core/AppTableContainer';
import TableHeading from 'components/CustomTableHeading/TableHeading';
import TableItem from 'modules/admin/auctions/TableItem';
import {useRouter} from 'next/router';

const ItemsTable = (props) => {
  const {data} = props;
  const router = useRouter();

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
    <AppTableContainer sxStyle={{height: '600px'}}>
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
          {data.map((row) => (
            <TableItem
              onClickRow={() =>
                router.push(`/admin/auctions/auction_item/${row.vehicle.id}`)
              }
              row={row}
              key={row.id}
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default ItemsTable;

ItemsTable.defaultProps = {
  data: [],
};

ItemsTable.propTypes = {
  data: PropTypes.array,
};
