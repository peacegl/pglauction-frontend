import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';

export default function conifgs(openUsersModal) {
  const {messages = []} = appIntl() ? appIntl() : {};
  return {
    columns: [
      {
        name: 'name',
        label: messages['common.name'],
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
        name: 'name',
        label: messages['common.slug'],
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography noWrap={true}>{value}</Typography>
          ),
        },
      },
      {
        name: 'group_name',
        label: messages['common.group'],
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
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography
              noWrap={true}
              // onClick={() =>
              //   openUsersModal(tableMeta.tableData[tableMeta.rowIndex]['id'])
              // }
            >
              {value}
            </Typography>
          ),
        },
      },
      {
        name: 'roles_count',
        label: messages['common.roles_count'],
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography
              noWrap={true}
              // onClick={() =>
              //   openUsersModal(tableMeta.tableData[tableMeta.rowIndex]['id'])
              // }
            >
              {value}
            </Typography>
          ),
        },
      },
      {
        name: 'created_at',
        label: messages['common.created_at'],
      },
      {
        name: 'updated_at',
        label: messages['common.updated_at'],
      },
    ],
  };
}
