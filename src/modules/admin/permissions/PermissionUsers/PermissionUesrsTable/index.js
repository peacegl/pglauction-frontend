import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';

import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import TableHeading from 'components/CustomTableHeading/TableHeading';

const PermissionUsersTable = ({ticketSupportData}) => {
  const header = [
    {
      id: 'common.profile',
    },
    {
      id: 'common.code',
      algin: 'left',
    },
    {
      id: 'common.username',
      algin: 'left',
    },
    {
      id: 'common.fullname',
      algin: 'left',
    },
    {
      id: 'common.phone',
      algin: 'left',
    },
    {
      id: 'common.whatsapp',
      algin: 'left',
    },
    {
      id: 'common.gender',
      algin: 'left',
    },
    {
      id: 'common.email',
      algin: 'left',
    },
    {
      id: 'common.status',
      algin: 'left',
    },
    {
      id: 'common.type',
      algin: 'left',
    },
    {
      id: 'common.birthDate',
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
    <AppTableContainer sxStyle={{height: '500px'}}>
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

export default PermissionUsersTable;

PermissionUsersTable.defaultProps = {
  ticketSupportData: [],
};

PermissionUsersTable.propTypes = {
  ticketSupportData: PropTypes.array,
};
