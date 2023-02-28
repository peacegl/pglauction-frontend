import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from 'components/CustomTableHeading/TableHeading';

import AppTableContainer from '@crema/core/AppTableContainer';
import TableItem from 'components/CustomTableHeading/TableItem';

const PermissionTable = ({ticketSupportData}) => {
  const header = [
    {
      id: 'common.name',
      algin: 'left',
      label: 'name',
      sx: {
        color: (theme) => theme.palette.primary.main,
        fontWeight: 'bold',
        cursor: 'pointer',
      },
      replace: true,
    },
    {
      id: 'common.type',
      algin: 'left',
      label: 'type',
      replace: true,
    },
    {
      id: 'common.users_count',
      algin: 'left',
      label: 'users_count',
    },
    {
      id: 'common.permissions_count',
      algin: 'left',
      label: 'permissions_count',
    },
    {
      id: 'common.created_by',
      algin: 'left',
      label: 'created_by.username',
    },
    {
      id: 'common.created_at',
      algin: 'left',
      label: 'created_at',
    },
    {
      id: 'common.updated_by',
      algin: 'left',
      label: 'updated_by.username',
    },
    {
      id: 'common.updated_at',
      algin: 'left',
      label: 'updated_at',
    },
  ];
  return (
    <AppTableContainer sxStyle={{height: '350px'}}>
      <Table stickyHeader>
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
          <TableItem data={ticketSupportData} header={header} />
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
