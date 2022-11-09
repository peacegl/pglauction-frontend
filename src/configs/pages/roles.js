import IntlMessages from '@crema/utility/IntlMessages';
import {Typography} from '@mui/material';
import CommonConfigs from '../index';
import * as yup from 'yup';

export default function conifgs() {
  return {
    columns: [
      {
        name: 'name',
        label: 'Name',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography noWrap={true}>{value}</Typography>
          ),
        },
      },
      {
        name: 'type',
        label: 'Type',
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
        label: 'Users Count',
      },
      {
        name: 'permissions_count',
        label: 'Permissions Count',
      },
      {
        name: 'created_by',
        label: 'Created by',
      },
      {
        name: 'created_at',
        label: 'Created At',
      },
      {
        name: 'updated_by',
        label: 'Updated by',
      },
      {
        name: 'updated_at',
        label: 'Updated At',
      },
    ],
    exportColumns: [],
    validationSchema: [
      yup.object({
        name: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.nameRequired' />),
        type: yup
          .string()
          .required(<IntlMessages id='validation.typeRequired' />),
      }),
      yup.object({}),
    ],
  };
}
