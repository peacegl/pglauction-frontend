import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
import * as yup from 'yup';

export const tableColumns = function () {
  return [
    {
      name: 'name',
      label: messages['common.name'],
    },
    {
      name: 'created_by',
      label: messages['common.created_by'],
    },
    {
      name: 'updated_by',
      label: messages['common.updated_by'],
    },
    {
      name: 'created_at',
      label: messages['common.created_at'],
    },
    {
      name: 'updated_at',
      label: messages['common.updated_at'],
    },
  ];
};

export default function conifgs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
    }),
    insertColumns: ['name'],
  };
}
