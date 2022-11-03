import IntlMessages from '@crema/utility/IntlMessages';
import {Avatar, Typography} from '@mui/material';
import * as yup from 'yup';
import CommonConfigs from '../index';
const phoneRegExp = CommonConfigs().phoneRegExp;

export default function conifgs() {
  return {
    columns: [
      {
        name: 'profile',
        label: 'Profile',
        options: {
          filter: false,
          download: false,
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
              {tableMeta.tableData[tableMeta.rowIndex]['key']}
            </Typography>
          ),
        },
      },
      {
        name: 'login',
        label: 'Username',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => value.username,
        },
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
        name: 'login',
        label: 'Email',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography>
              {value.email} <br />
              {tableMeta.tableData[tableMeta.rowIndex]['second_email']}
            </Typography>
          ),
        },
      },
      {
        name: 'login',
        label: 'Status',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => value.status,
        },
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
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
      },
      {
        name: 'updated_by',
        label: 'Updated by',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
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
          .matches(phoneRegExp, <IntlMessages id='validation.invalidPhone' />)
          .required(<IntlMessages id='validation.phoneRequired' />),
        whatsapp: yup
          .string()
          .matches(phoneRegExp, <IntlMessages id='validation.validatePhone' />)
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
          .required(<IntlMessages id='validation.usernameRequired' />),
        password: yup
          .string()
          .required(<IntlMessages id='validation.passwordRequired' />),
        second_email: yup
          .string()
          .required(<IntlMessages id='validation.secondEmailRequired' />),
        status: yup
          .string()
          .required(<IntlMessages id='validation.statusRequired' />),
        type: yup
          .string()
          .required(<IntlMessages id='validation.typeRequired' />),
      }),
    ],
    insertColumns: [
      'vin',
      'lot_number',
      'year',
      'model',
      'color',
      'engine_type',
      'cylinders',
      'vehicle_type',
      'seller_id',
      'location_id',
      'category_id',
      'title',
      'subtitle',
      'start_date',
      'end_date',
      'minimum_bid',
      'buy_now_price',
      'description',
      'youtube_url',
      'note',
    ],
  };
}
