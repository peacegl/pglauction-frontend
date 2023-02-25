import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {blue, green, red} from '@mui/material/colors';
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

  return (
    <TableRow
      key={row.id}
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
      }}
      className='item-hover'
    >
      <TableCell scope='row' className='tableCell'>
        {row.code}.
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
          {row.images[0] ? (
            <Avatar src={row.images[0].path} sx={{height: 60, width: 60}} />
          ) : (
            <Avatar sx={{height: 60, width: 60}}>
              {row?.model[0].toUpperCase()}
            </Avatar>
          )}
          <Box
            component='span'
            sx={{
              ml: 3.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {row.name}
          </Box>
        </Box>
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.vin}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.lot_number}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {moneyFormater(row.auction_items[0]?.minimum_bid)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {moneyFormater(row.auction_items[0]?.buy_now_price)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.auction_items[0]?.status}
      </TableCell>

      <TableCell align='left' className='tableCell' fontWeight={Fonts.MEDIUM}>
        {moneyFormater(row.price)}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.sale_rate + ' %'}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {moneyFormater(
          parseInt(row.price) + parseInt((row.price * row.sale_rate) / 100),
        )}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.year}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.make}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.model}
      </TableCell>
      {/* <TableCell align='left' className='tableCell'>
        {row.status}
      </TableCell> */}

      <TableCell
        align='left'
        sx={{
          color: getProgressColor(row.status),
        }}
        className='tableCell'
      >
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.REGULAR,
          }}
        >
          {row.status.toUpperCase()}
        </Box>
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.exterior_color}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.interior_color}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.primary_damage}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.is_featured ? messages['common.yes'] : messages['common.no']}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.is_best_selling ? messages['common.yes'] : messages['common.no']}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.engine_type}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {row.odometer_type}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.transmission}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.created_by?.username}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {row.updated_by?.username}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
};
