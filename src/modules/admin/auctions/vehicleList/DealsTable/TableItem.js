import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {blue, green, grey, red} from '@mui/material/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {moneyFormater} from 'configs';
import {appIntl} from '@crema/utility/helper/Utils';

const getProgressColor = (progress) => {
  switch (progress) {
    case 'sold':
      return `${red[600]}`;

    case 'future':
      return `${blue[600]}`;

    case 'available':
      return `${green[600]}`;

    default:
      return `${red[600]}`;
  }
};

const TableItem = (props) => {
  const {row} = props;
  const {messages = []} = appIntl() ? appIntl() : {};

  const handleClick = (id) => {
    console.log(id);
  };

  const color = grey[100];

  return (
    <TableRow
      key={row.vehicle.id}
      sx={{
        borderBottom: '0 none',
        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,
          padding: 2,
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
      onClick={() => handleClick(row.vehicle.id)}
    >
      <TableCell scope='row' className='tableCell'>
        {row.vehicle.str_code}
      </TableCell>
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {row.vehicle.images[0] ? (
            <Avatar
              src={row.vehicle.images[0].path}
              sx={{height: 60, width: 60}}
            />
          ) : (
            <Avatar sx={{height: 60, width: 60}}>
              {row.vehicle.model[0].toUpperCase()}
            </Avatar>
          )}
          <Box
            component='span'
            sx={{
              ml: 3.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {row.vehicle.name}
          </Box>
        </Box>
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.vin}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.lot_number}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {moneyFormater(row.minimum_bid)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {moneyFormater(row.buy_now_price)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row?.status}
      </TableCell>

      <TableCell align='left' className='tableCell' fontWeight={Fonts.MEDIUM}>
        {moneyFormater(row.vehicle.price)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.sale_rate + ' %'}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {moneyFormater(
          parseInt(row.vehicle.price) +
            parseInt((row.vehicle.price * row.vehicle.sale_rate) / 100),
        )}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.year}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.make}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.model}
      </TableCell>

      <TableCell
        align='left'
        sx={{
          color: getProgressColor(row.vehicle.status),
        }}
        className='tableCell'
      >
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.REGULAR,
          }}
        >
          {row.vehicle.status.toUpperCase()}
        </Box>
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.exterior_color}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.interior_color}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.primary_damage}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.is_featured
          ? messages['common.yes']
          : messages['common.no']}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.is_best_selling
          ? messages['common.yes']
          : messages['common.no']}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.engine_type}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.vehicle.odometer_type}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.transmission}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.created_by?.username}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vehicle.updated_by?.username}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
};
