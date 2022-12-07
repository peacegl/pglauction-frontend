import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
import CommonConfigs, {createdBy, dateColumn, updatedBy} from '../index';
import * as yup from 'yup';

const phoneRegExp = CommonConfigs().phoneRegExp;
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            U{value.toString().padStart(5, '0')}
          </Typography>
        ),
      },
    },
    {
      name: 'username',
      label: messages['common.username'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Username: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'firstname',
      label: messages['common.firstname'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `First Name: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'lastname',
      label: messages['common.lastname'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Last Name: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'phone',
      label: messages['common.phone'],
      options: {
        filter: false,
      },
    },
    {
      name: 'whatsapp',
      label: messages['common.whatsapp'],
      options: {
        filter: false,
      },
    },
    {
      name: 'gender',
      label: messages['common.gender'],
      options: {
        filter: true,
        filterType: 'select',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Gender: ${v}`;
            }
            return false;
          },
        },
        filterOptions: {
          names: ['Male', 'Female'],
        },
      },
    },
    {
      name: 'email',
      label: messages['common.email'],
      options: {
        filter: false,
      },
    },
    {
      name: 'status',
      label: messages['common.status'],
      options: {
        filter: true,
        filterType: 'select',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Status: ${v}`;
            }
            return false;
          },
        },
        filterOptions: {
          names: ['Active', 'Pending', 'Inactive'],
        },
      },
    },
    {
      name: 'type',
      label: messages['common.type'],
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
    {
      name: 'birth_date',
      label: messages['common.birth_date'],
      options: {
        display: false,
        filter: false,
      },
    },
    createdBy(),
    dateColumn('created_at', messages['common.created_at']),
    updatedBy(),
    dateColumn('updated_at', messages['common.updated_at']),
  ];
};

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      buyer_id: yup
        .string()
        .required(<IntlMessages id='validation.buyerRequired' />),
      sale_price: yup
        .number()
        .typeError(<IntlMessages id='validation.priceError' />)
        .required(<IntlMessages id='validation.priceRequired' />),
      sale_date: yup
        .string()
        .required(<IntlMessages id='validation.dateRequired' />),
    }),
  };
}
