import IntlMessages from '@crema/utility/IntlMessages';
import {Avatar, Typography} from '@mui/material';
const phoneRegExp = CommonConfigs().phoneRegExp;
import CommonConfigs from '../index';
import * as yup from 'yup';

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  return {
    columns: [
      {
        name: 'profile',
        label: 'Profile',
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
        label: 'Username',
      },
      {
        name: 'firstname',
        label: 'First Name',
      },
      {
        name: 'lastname',
        label: 'Last Name',
      },
      {
        name: 'phone',
        label: 'Phone Number',
      },
      {
        name: 'whatsapp',
        label: 'WhatsApp',
      },
      {
        name: 'gender',
        label: 'Gender',
      },
      {
        name: 'email',
        label: 'Email',
      },
      {
        name: 'status',
        label: 'Status',
      },
      {
        name: 'birth_date',
        label: 'Birthday',
        options: {
          display: 'false',
        },
      },
      {
        name: 'address',
        label: 'Address',
        options: {
          display: 'false',
        },
      },
      {
        name: 'created_by',
        label: 'Created by',
      },
      {
        name: 'created_at',
        label: 'Created At',
      },
      {
        name: 'updated_by',
        label: 'Updated by',
      },
      {
        name: 'updated_at',
        label: 'Updated At',
      },
    ],
    exportColumns: [],
    validationSchema: [
      yup.object({
        firstname: yup
          .string()
          .required(<IntlMessages id='validation.firstnameRequired' />),
        lastname: yup
          .string()
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
          .min(3, <IntlMessages id='validation.minUsername' />)
          .required(<IntlMessages id='validation.usernameRequired' />),
        password: edit
          ? yup.string().nullable()
          : yup
              .string()
              .required(<IntlMessages id='validation.passwordRequired' />),
        password_confirmation: edit
          ? yup.string().nullable()
          : yup
              .string()
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
      }),
    ],
  };
}
