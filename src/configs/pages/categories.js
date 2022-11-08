import IntlMessages from '@crema/utility/IntlMessages';
import {Typography} from '@mui/material';
import * as yup from 'yup';

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
        name: 'parent_name',
        label: 'Parent Name',
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
    validationSchema: yup.object({
      name: yup
        .string()
        .required(<IntlMessages id='validation.nameRequired' />),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
