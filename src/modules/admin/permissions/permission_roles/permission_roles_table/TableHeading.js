import React from 'react';
import TableCell from '@mui/material/TableCell';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import TableRow from '@mui/material/TableRow';

import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        bgcolor: (theme) => theme.palette.primary.main,
        borderBottom: '0 none',

        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,
          color: 'white',
          padding: {xs: 2, xl: 4},
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
        <IntlMessages id='common.name' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.type' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.users_count' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.permissions_count' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.created_by' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.created_at' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.updated_by' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.updated_at' />
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
