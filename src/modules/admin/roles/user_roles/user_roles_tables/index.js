import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';

import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import TableHeading from 'components/CustomTableHeading/TableHeading';
import TableItem from 'components/CustomTableHeading/TableItem';

const TicketSupportTable = ({ticketSupportData}) => {
  const header = [
    {
      id: 'common.profile',
      label: 'image',
      image: true,
      hint: 'username',
    },
    {
      id: 'common.code',
      algin: 'left',
      sx: {
        color: (theme) => theme.palette.primary.main,
        fontWeight: 'bold',
        cursor: 'pointer',
      },
      label: 'str_code',
    },
    {
      id: 'common.username',
      algin: 'left',
      label: 'username',
    },
    {
      id: 'common.fullname',
      algin: 'left',
      label: 'fullname',
    },
    {
      id: 'common.phone',
      algin: 'left',
      label: 'phone',
    },
    {
      id: 'common.whatsapp',
      algin: 'left',
      label: 'whatsapp',
    },
    {
      id: 'common.gender',
      algin: 'left',
      label: 'gender',
    },
    {
      id: 'common.email',
      algin: 'left',
      label: 'email',
    },
    {
      id: 'common.status',
      algin: 'left',
      label: 'status',
    },
    {
      id: 'common.type',
      algin: 'left',
    },
    {
      id: 'common.birthDate',
      algin: 'left',
      label: 'birth_date',
    },
    {
      id: 'common.created_by',
      algin: 'left',
      label: 'created_by',
    },

    {
      id: 'common.created_at',
      algin: 'left',
      label: 'created_at',
    },
    {
      id: 'common.updated_by',
      algin: 'left',
      label: 'updated_by',
    },
    {
      id: 'common.updated_at',
      algin: 'left',
      label: 'updated_by',
    },
  ];

  return (
    <AppTableContainer sxStyle={{height: '500px'}}>
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

export default TicketSupportTable;

TicketSupportTable.defaultProps = {
  ticketSupportData: [],
};

TicketSupportTable.propTypes = {
  ticketSupportData: PropTypes.array,
};
