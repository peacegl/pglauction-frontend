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
              {tableMeta.tableData[tableMeta.rowIndex]['key']
                .toString()
                .padStart(5, '0')}
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
        name: 'parent.name',
        label: 'Parent Name',
      },
      {
        name: 'description',
        label: 'Description',
      },
      {
        name: 'created_by.username',
        label: 'Created by',
      },
      {
        name: 'updated_by.username',
        label: 'Updated by',
      },
    ],
  };
}
