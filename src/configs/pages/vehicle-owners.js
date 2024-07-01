import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
import * as yup from 'yup';
import {CommonConfigs} from 'configs';
const phoneRegExp = CommonConfigs().phoneRegExp;
const {messages = []} = appIntl() ? appIntl() : {};
import CustomerStatus from '../../modules/admin/customers/CustomerStatus';
import { getCustomDateTime } from '@crema/utility/Utils';

export const tableColumns = function (
) {
  return [
    {
      name: 'id',
      label: messages['common.id'],
      options: {
        display: false,
        viewColumns: false,
      },
    },
     
     
    {
      name: 'name',
      label: messages['common.name'],
    },
    
    {
      name: 'created_by',
      label: messages['common.created_by'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div> {value.username}</div>
        ),
      },
    },
    {
      name: 'updated_by',
      label: messages['common.updated_by'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>  {
         return  <div> {value?.username}</div>
        },
      },
    },
    {
      name: 'created_at',
      label: messages['common.created_at'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>  {
         return  <div> {getCustomDateTime(value)}</div>
        },
      },
    },
    {
      name: 'updated_at',
      label: messages['common.updated_at'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>  {
         return  <div> {getCustomDateTime(value)}</div>
        },
      },
    },
  ];
};

export const filterContent = [
   
];

export default function configs(
  invalidPhone
) {
  return {
    exportColumns: [],
    validationSchema: [
      yup.object({
        name: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.fullnameRequired' />),
        // phone: yup
        //   .string()
        //   .matches(phoneRegExp, invalidPhone)
        //   .required(<IntlMessages id='validation.phoneRequired' />),
      }),
       
    ],
  };
}
