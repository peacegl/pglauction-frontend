import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';

const TicketSupportTable = ({ticketSupportData}) => {
  return (
    <AppTableContainer sxStyle={{height: '600px'}}>
      <Table>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {ticketSupportData.map((row, index) => (
            <TableItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default TicketSupportTable;

TicketSupportTable.defaultProps = {
  ticketSupportData: [],
};

TicketSupportTable.propTypes = {
  ticketSupportData: PropTypes.array,
};
