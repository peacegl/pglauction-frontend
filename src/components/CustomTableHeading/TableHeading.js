import React from 'react';
import TableCell from '@mui/material/TableCell';
import IntlMessages from '../../@crema/utility/IntlMessages';
import TableRow from '@mui/material/TableRow';
import {Fonts} from '../../shared/constants/AppEnums';
import {propTypes} from 'velocity-react/velocity-component';

const TableHeading = ({header}) => {
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
      {header.map((data, index) => {
        return (
          <TableCell
            key={index}
            align={
              data?.align != null || data?.align != undefined
                ? data.align
                : 'center'
            }
            className='tableCell'
          >
            <IntlMessages id={data.id} />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableHeading;

TableHeading.propTypes = {
  header: propTypes.array,
};
