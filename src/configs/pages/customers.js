import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
import * as yup from 'yup';
import {CommonConfigs} from 'configs';
const phoneRegExp = CommonConfigs().phoneRegExp;
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'profile',
      label: messages['common.profile'],
      options: {
        download: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Avatar alt={' profile picture.'} src={value} />
        ),
      },
    },
    {
      name: 'code',
      label: 'Code',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            C{value.toString().padStart(6, '0')}
          </Typography>
        ),
      },
    },
    {
      name: 'username',
      label: messages['common.username'],
    },
    {
      name: 'fullname',
      label: messages['common.fullname'],
    },
    {
      name: 'phone',
      label: messages['common.phone'],
    },
    {
      name: 'whatsapp',
      label: messages['common.whatsapp'],
    },
    {
      name: 'gender',
      label: messages['common.gender'],
    },
    {
      name: 'email',
      label: messages['common.email'],
    },
    {
      name: 'status',
      label: messages['common.status'],
    },
    {
      name: 'type',
      label: messages['common.type'],
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

export const filterContent = [
  {
    title: 'id_filtering',
    items: [
      {
        name: 'customers.id',
        label: 'Code',
        type: 'autocomplete',
        url: '/codes/auto_complete?model=Customer',
        keyName: 'code',
      },
      {
        name: 'login.id',
        label: 'Username',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'customers.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'customers.updated_by',
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
        name: 'customers.gender',
        label: 'Gender',
        type: 'checkbox',
        items: ['male', 'female'],
      },
      {
        name: 'login.type',
        label: 'Type',
        type: 'checkbox',
        items: ['memeber', 'seller'],
      },
    ],
  },
  {
    title: 'date_range',
    items: [
      {
        name: 'customers.created_at',
        label: 'Created At',
        type: 'date_range',
      },
      {
        name: 'customers.updated_at',
        label: 'Updated At',
        type: 'date_range',
      },
    ],
  },
];

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  return {
    exportColumns: [],
    validationSchema: [
      yup.object({
        fullname: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.fullnameRequired' />),
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
        timezone: yup
          .string()
          .required(<IntlMessages id='validation.timezoneRequired' />),
      }),
    ],
  };
}
