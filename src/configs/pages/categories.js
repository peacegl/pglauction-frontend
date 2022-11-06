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
        name: 'parent.name',
        label: 'Parent Name',
      },
      {
        name: 'description',
        label: 'Description',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div dangerouslySetInnerHTML={{__html: value}} />
          ),
        },
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
    exportColumns: [],
    validationSchema: yup.object({
      name: yup
        .string()
        .required(<IntlMessages id='validation.nameRequired' />),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
