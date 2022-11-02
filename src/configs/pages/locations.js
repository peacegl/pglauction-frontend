import {Typography} from '@mui/material';

export default function conifgs() {
  return {
    columns: [
      {
        name: 'code',
        label: 'Code',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
              {value}
              {tableMeta.tableData[tableMeta.rowIndex]['key']}
            </Typography>
          ),
        },
      },
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'slug',
        label: 'Slug',
      },
      {
        name: 'parent',
        label: 'Parent Name',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.name,
        },
      },
      {
        name: 'description',
        label: 'Description',
      },
      {
        name: 'created_by',
        label: 'Created by',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
      },
      {
        name: 'updated_by',
        label: 'Updated by',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
      },
    ],
  };
}
