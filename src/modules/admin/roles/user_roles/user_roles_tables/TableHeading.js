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
        <IntlMessages id='common.profile' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.code' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.username' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.fullname' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.phone' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.whatsapp' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.gender' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.email' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.status' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.type' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.birthDate' />
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
