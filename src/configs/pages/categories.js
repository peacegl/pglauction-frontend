import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';
import {createdAt, createdBy, updatedAt, updatedBy} from 'configs';

const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={'true'}>
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
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Name: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'slug',
      label: messages['common.slug'],
      options: {
        filter: false,
      },
    },
    {
      name: 'parent_name',
      label: messages['common.parent_name'],
      options: {
        filter: true,
        filterType: 'select',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Type: ${v}`;
            }
            return false;
          },
        },
        filterOptions: {
          names: ['Employee', 'Seller'],
        },
      },
    },
    createdBy(),
    createdAt,
    updatedBy(),
    updatedAt,
  ];
};

export default function conifgs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
