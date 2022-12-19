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
        customBodyRender: (value, tableMeta, updateValue) => (
          <Avatar alt={' profile picture.'} src={value} />
        ),
      },
    },
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            U{value.toString().padStart(6, '0')}
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
      name: 'birth_date',
      label: messages['common.birth_date'],
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
        name: 'users.id',
        label: 'Code',
        type: 'autocomplete',
        url: '/codes/auto_complete?model=User&id=',
        keyName: 'str_code',
      },
      {
        name: 'login.id',
        label: 'Username',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
        keyName: 'username',
      },
      {
        name: 'users.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
        keyName: 'username',
      },
      {
        name: 'users.updated_by',
        label: 'Updated By',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
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
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ];
  const FILE_SIZE = 10;
  return {
    exportColumns: [],
    validationSchema: [
      yup.object({
        // profile: yup
        //   .mixed()
        //   .test(
        //     'fileSize',
        //     'File Size is too large',
        //     (value) => value?.size <= FILE_SIZE,
        //   )
        //   .test('fileType', 'Unsupported File Format', (value) =>
        //     SUPPORTED_FORMATS.includes(value?.type),
        //   ),
        fullname: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.fullnameRequired' />),
        phone: yup.string().matches(phoneRegExp, invalidPhone),
        // .required(<IntlMessages id='validation.phoneRequired' />),
        whatsapp: yup.string().matches(phoneRegExp, invalidWhatsapp),
        // .required(<IntlMessages id='validation.whatsappRequired' />),
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
