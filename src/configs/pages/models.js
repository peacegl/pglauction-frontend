import {appIntl} from '@crema/utility/helper/Utils';
import IntlMessages from '@crema/utility/IntlMessages';
import {createdBy, dateColumn, updatedBy} from 'configs';
const {messages = []} = appIntl() ? appIntl() : {};
import * as yup from 'yup';

export const tableColumns = function () {
  return [
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
      name: 'make_name',
      label: messages['common.make'],
      // options: {
      //   filter: true,
      //   filterType: 'textField',
      //   customFilterListOptions: {
      //     render: (v) => {
      //       if (v) {
      //         return `${messages['common.make']}: ${v}`;
      //       }
      //       return false;
      //     },
      //   },
      // },
    },
    createdBy(),
    dateColumn('created_at', messages['common.created_at']),
    updatedBy(),
    dateColumn('updated_at', messages['common.updated_at']),
  ];
};

export default function conifgs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
      make_id: yup
        .string()
        .required(<IntlMessages id='validation.makeRequired' />),
    }),
    insertColumns: ['name', 'make_id'],
  };
}
