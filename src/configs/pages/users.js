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
      name: 'profile',
      label: messages['common.profile'],
      options: {
        filter: false,
        download: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Avatar alt={' profile picture.'} src={value} />
        ),
      },
    },
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

export const filterContent = [
  {
    title: 'id_filtering',
    items: [
      {
        name: 'users.code',
        label: 'Code',
        type: 'autocomplete',
        url: '/user_codes/auto_complete',
        keyName: 'code',
      },
      {
        name: 'login.username',
        label: 'Username',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'users.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'users.updated_by',
        label: 'Updated By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
    ],
  },
  {
    title: 'data',
    items: [
      {
        name: 'login.status',
        label: 'Status',
        type: 'checkbox',
        items: ['active', 'inactive', 'pending'],
      },

      {
        name: 'users.gender',
        label: 'Gender',
        type: 'checkbox',
        items: ['male', 'female'],
      },
      {
        name: 'login.type',
        label: 'Type',
        type: 'checkbox',
        items: ['employee', 'seller'],
      },
    ],
  },
  {
    title: 'date_range',
    items: [
      {
        name: 'users.created_at',
        label: 'Created At',
        type: 'date_range',
      },
      {
        name: 'users.updated_at',
        label: 'Updated At',
        type: 'date_range',
      },
    ],
  },
];

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  const {messages = []} = appIntl() ? appIntl() : {};
  return {
    exportColumns: [],
    validationSchema: [
      yup.object({
        firstname: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.firstnameRequired' />),
        lastname: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.lastnameRequired' />),
        phone: yup
          .string()
          .matches(phoneRegExp, invalidPhone)
          .required(<IntlMessages id='validation.phoneRequired' />),
        whatsapp: yup
          .string()
          .matches(phoneRegExp, invalidWhatsapp)
          .required(<IntlMessages id='validation.whatsappRequired' />),
        gender: yup
          .string()
          .required(<IntlMessages id='validation.genderRequired' />),
      }),
      yup.object({
        email: yup
          .string()
          .email(<IntlMessages id='validation.invalidEmail' />)
          .required(<IntlMessages id='validation.eamilRequired' />),
        username: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.usernameRequired' />),
        password: edit
          ? yup.string().nullable()
          : yup
              .string()
              .min(8, <IntlMessages id='validation.min8Letter' />)
              .max(64, <IntlMessages id='validation.max64Letter' />)
              .required(<IntlMessages id='validation.passwordRequired' />),
        password_confirmation: edit
          ? yup.string().nullable()
          : yup
              .string()
              .min(8, <IntlMessages id='validation.min8Letter' />)
              .max(64, <IntlMessages id='validation.max64Letter' />)
              .oneOf([yup.ref('password'), null], misMatch)
              .required(
                <IntlMessages id='validation.passwordConfrimationRequired' />,
              ),
        status: yup
          .string()
          .required(<IntlMessages id='validation.statusRequired' />),
        type: yup
          .string()
          .required(<IntlMessages id='validation.typeRequired' />),
        timezone: yup
          .string()
          .required(<IntlMessages id='validation.timezoneRequired' />),
      }),
    ],
  };
}
