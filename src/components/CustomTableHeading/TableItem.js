import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {grey, red} from '@mui/material/colors';
import {Avatar} from '@mui/material';

const TableItem = ({data, header}) => {
  const color = grey[100];
  const handleClick = (id) => {
    console.log(id);
  };

  // for avatar
  // {
  //   id: 'common.name',
  //   label: 'profile',
  //   image: true,
  //   avatar: 'A', for when photo dose not exist
  // },
  //  {
  //   id: 'common.name',
  //   replace: true,
  //   sx: {
  //     color: (theme) => theme.palette.primary.main,
  //     fontWeight: 'bold',
  //     cursor: 'pointer',
  //   },
  // },

  return data.map((row, index) => {
    return (
      <TableRow
        key={index}
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
        {header.map((head, i) => {
          return (
            <TableCell key={i} align='left' className='tableCell' sx={head.sx}>
              {head.replace ? (
                row[head.label]
                  .replaceAll('_', ' ')
                  .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
              ) : head.image ? (
                row[head.label] ? (
                  <Avatar
                    sx={{
                      width: {xs: 40, xl: 50},
                      height: {xs: 40, xl: 50},
                      backgroundColor: red[500],
                    }}
                    src={row[head.label]}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: {xs: 40, xl: 50},
                      height: {xs: 40, xl: 50},
                      backgroundColor: red[500],
                    }}
                  >
                    {row[head.hint][0].toUpperCase()}
                  </Avatar>
                )
              ) : (
                row[head.label]
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.array,
};
