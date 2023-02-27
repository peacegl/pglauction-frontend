import React from 'react';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {grey, red} from '@mui/material/colors';
import {appIntl} from '@crema/utility/helper/Utils';

const TableItem = (props) => {
  const {messages = []} = appIntl() ? appIntl() : {};
  const {row} = props;

  const color = grey[100];

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <TableRow
      sx={{
        borderBottom: '0 none',
        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,

          padding: '6px 8px',
          '&:first-of-type': {
            pl: 5,
          },
          '&:last-of-type': {
            pr: 5,
          },
        },
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: color,
        },
      }}
      className='item-hover'
      onClick={() => handleClick(row.id)}
    >
      <TableCell
        scope='row'
        className='tableCell'
        sx={{
          color: (theme) => theme.palette.primary.main,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {row.name
          .replaceAll('_', ' ')
          .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.name}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.group_name}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.users_count +
          ' ' +
          `${
            row.users_count > 1
              ? messages['sidebar.users']
              : messages['common.user']
          }`}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.roles_count +
          ' ' +
          `${
            row.roles_count > 1
              ? messages['sidebar.roles']
              : messages['common.role']
          }`}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.created_at}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.updated_at}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
};
