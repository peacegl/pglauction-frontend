import {Typography} from '@mui/material';

export default function conifgs() {
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
      },
      {
        name: 'roles_count',
        label: 'Roles Count',
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
