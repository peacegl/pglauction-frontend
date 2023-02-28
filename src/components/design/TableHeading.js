import IntlMessages from '@crema/utility/IntlMessages';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import {Fonts} from 'shared/constants/AppEnums';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

const TableHeading = (props) => {
  return (
    <TableHead
      sx={{
        borderBottom: '0 none',
      }}
    >
      <TableRow
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          borderBottom: '0 none',

          '& .tableCell': {
            borderBottom: '0 none',
            fontSize: 13,
            color: 'white',
            padding: 3,
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
          <IntlMessages id='common.slug' />
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <IntlMessages id='common.group' />
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <IntlMessages id='common.users_count' />
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <IntlMessages id='common.roles_count' />
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <IntlMessages id='common.created_at' />
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <IntlMessages id='common.updated_at' />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeading;
TableHeading.propTypes = {
  columns: PropTypes.array,
};
