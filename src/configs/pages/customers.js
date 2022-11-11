import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
const phoneRegExp = CommonConfigs().phoneRegExp;
import CommonConfigs from '../index';
import * as yup from 'yup';

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  const {messages = []} = appIntl() ? appIntl() : {};
  return {
    columns: [
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
        label: 'Code',
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
      },
      {
        name: 'firstname',
        label: messages['common.firstname'],
      },
      {
        name: 'lastname',
        label: messages['common.lastname'],
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
        name: 'created_at',
        label: messages['common.created_at'],
      },
      {
        name: 'updated_by',
        label: messages['common.updated_by'],
      },
      {
        name: 'updated_at',
        label: messages['common.updated_at'],
      },
    ],
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
