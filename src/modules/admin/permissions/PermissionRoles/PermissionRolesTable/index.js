import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from '../../../../../components/CustomTableHeading/TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';

const PermissionTable = ({ticketSupportData}) => {
  const header = [
    {
      id: 'common.name',
      algin: 'left',
    },
    {
      id: 'common.type',
      algin: 'left',
    },
    {
      id: 'common.users_count',
      algin: 'left',
    },
    {
      id: 'common.permissions_count',
      algin: 'left',
    },
    {
      id: 'common.created_by',
      algin: 'left',
    },
    {
      id: 'common.created_at',
      algin: 'left',
    },
    {
      id: 'common.updated_by',
      algin: 'left',
    },
    {
      id: 'common.updated_at',
      algin: 'left',
    },
  ];
  return (
    <AppTableContainer sxStyle={{height: '350px'}}>
      <Table>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading header={header} />
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

export default PermissionTable;

PermissionTable.defaultProps = {
  ticketSupportData: [],
};

PermissionTable.propTypes = {
  ticketSupportData: PropTypes.array,
};
