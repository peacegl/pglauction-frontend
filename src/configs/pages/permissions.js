import {Typography} from '@mui/material';

export default function conifgs(openUsersModal) {
  return {
    columns: [
      {
        name: 'name',
        label: 'Name',
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
        label: 'Slug',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography noWrap={true}>{value}</Typography>
          ),
        },
      },
      {
        name: 'group_name',
        label: 'Group',
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
        label: 'Roles Count',
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
        label: 'Created At',
      },
      {
        name: 'updated_at',
        label: 'Updated At',
      },
    ],
  };
}
