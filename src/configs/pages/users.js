import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
import CommonConfigs, {
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
} from '../index';
import * as yup from 'yup';

const phoneRegExp = CommonConfigs().phoneRegExp;

export const userColumns = function (userAutocompleteOptions = []) {
  const {messages = []} = appIntl() ? appIntl() : {};
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
            {value}
            {tableMeta.tableData[tableMeta.rowIndex]['key']
              .toString()
              .padStart(5, '0')}
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
      },
    },
    {
      name: 'firstname',
      label: messages['common.firstname'],
      options: {
        display: true,
        filterType: 'textField',
      },
    },
    {
      name: 'lastname',
      label: messages['common.lastname'],
      options: {
        display: true,
        filterType: 'textField',
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
    },
    {
      name: 'type',
      label: messages['common.type'],
    },
    {
      name: 'birth_date',
      label: messages['common.birth_date'],
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: 'address',
      label: messages['common.address'],
      options: {
        display: false,
        filter: false,
      },
    },
    createdBy(userAutocompleteOptions, () => {}),
    createdAt,
    updatedBy(userAutocompleteOptions, () => {}),
    updatedAt,
  ];
};

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
