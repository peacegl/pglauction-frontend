import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {grey, red} from '@mui/material/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableItem = (props) => {
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
      <TableCell align='left' className='tableCell'>
        <Box display='flex' alignItems='center'>
          {row.image ? (
            <Avatar
              sx={{
                width: {xs: 40, xl: 50},
                height: {xs: 40, xl: 50},
                backgroundColor: red[500],
              }}
              src={row.image}
            />
          ) : (
            <Avatar
              sx={{
                width: {xs: 40, xl: 50},
                height: {xs: 40, xl: 50},
                backgroundColor: red[500],
              }}
            >
              {row.fullname[0].toUpperCase()}
            </Avatar>
          )}
        </Box>
      </TableCell>

      <TableCell
        scope='row'
        className='tableCell'
        sx={{
          color: (theme) => theme.palette.primary.main,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {row.str_code}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.username}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.fullname}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.phone}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.whatsapp}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.gender}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.email}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.status}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.type}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.birth_date}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.created_by}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.created_at}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.updated_by}
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
