import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';

const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function (getSingleRole) {
  return [
    {
      name: 'id',
      label: messages['common.id'],
      options: {
        display: false,
        viewColumns: false,
      },
    },
    {
      name: 'name',
      label: messages['common.name'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => getSingleRole(tableMeta.rowData[0])}
            noWrap={true}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'type',
      label: messages['common.type'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography noWrap={true}>
            {value
              .replaceAll('_', ' ')
              .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
          </Typography>
        ),
      },
    },
    {
      name: 'users_count',
      label: messages['common.users_count'],
    },
    {
      name: 'permissions_count',
      label: messages['common.permissions_count'],
    },
    {
      name: 'created_by',
      label: messages['common.created_by'],
    },
    {
      name: 'created_at',
      label: messages['common.created_at'],
    },
    {
      name: 'updated_by',
      label: messages['common.updated_by'],
    },
    {
      name: 'updated_at',
      label: messages['common.updated_at'],
    },
  ];
};

export default function configs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, <IntlMessages id='validation.min3Letter' />)
        .max(64, <IntlMessages id='validation.max64Letter' />)
        .required(<IntlMessages id='validation.nameRequired' />),
    }),
  };
}
