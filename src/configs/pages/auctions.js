import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
import * as yup from 'yup';

export const tableColumns = function () {
  return [
    {
      name: 'str_code',
      label: messages['common.code'],
    },
    {
      name: 'name',
      label: messages['common.name'],
    },
    {
      name: 'start_date',
      label: messages['common.startDate'],
    },
    {
      name: 'end_date',
      label: messages['common.endDate'],
    },
    {
      name: 'items_count',
      label: messages['auction.VehiclesCount'],
    },
    {
      name: 'status',
      label: messages['common.status'],
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

export default function configs(invalidYoutube) {
  return {
    exportColumns: [],
    validationSchema: [
      yup.object({
        start_date: yup
          .date()
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .nullable(),
        end_date: yup
          .date()
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .nullable(),
      }),
      yup.object({}),
    ],
  };
}
