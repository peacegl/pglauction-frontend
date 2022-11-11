import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';

export default function conifgs() {
  const {messages = []} = appIntl() ? appIntl() : {};
  return {
    columns: [
      {
        name: 'code',
        label: messages['code'],
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
        label: messages['common.name'],
      },
      {
        name: 'slug',
        label: messages['common.slug'],
      },
      {
        name: 'parent_name',
        label: messages['common.parent_name'],
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
    ],
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
