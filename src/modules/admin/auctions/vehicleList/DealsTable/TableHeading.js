import React from 'react';
import TableCell from '@mui/material/TableCell';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import TableRow from '@mui/material/TableRow';
import {grey} from '@mui/material/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        borderBottom: '0 none',
        color: grey[500],
        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          '&:first-of-type': {
            pl: 5,
          },
          '&:last-of-type': {
            pr: 5,
          },
        },
      }}
    >
      <TableCell className='tableCell'>
        <IntlMessages id='common.code' />
      </TableCell>
      <TableCell className='tableCell'>
        <IntlMessages id='common.image' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.vin' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.lot_number' />
      </TableCell>

      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.minimum_bid' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.buy_now_price' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.bid_status' />
      </TableCell>

      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.totalCost' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.saleRate' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.price' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.year' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.make' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='sidebar.mui.util.modal' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.status' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.exterior_color' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.interior_color' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.primary_damage' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.is_featured' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.is_best_selling' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.engine_type' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.odometer' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='vehicle.transmission' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.created_by' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.updated_by' />
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
