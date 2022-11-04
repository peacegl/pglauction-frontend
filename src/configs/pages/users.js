import IntlMessages from '@crema/utility/IntlMessages';
import {Avatar, Typography} from '@mui/material';
import * as yup from 'yup';
import CommonConfigs from '../index';
const phoneRegExp = CommonConfigs().phoneRegExp;
import {appIntl} from '@crema/utility/helper/Utils';

export default function conifgs() {
  const {messages} = appIntl();
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
              {tableMeta.tableData[tableMeta.rowIndex]['key']
                .toString()
                .padStart(5, '0')}
            </Typography>
          ),
        },
      },
      {
        name: 'login.username',
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
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Typography>
                {tableMeta.tableData[tableMeta.rowIndex]['login']['email']}
                <br />
                {tableMeta.tableData[tableMeta.rowIndex]['second_email']}
              </Typography>
            );
          },
        },
      },
      {
        name: 'login.status',
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
        name: 'created_by.username',
        label: 'Created by',
      },
      {
        name: 'updated_by.username',
        label: 'Updated by',
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
          .matches(phoneRegExp, messages['validation.invalidPhone'])
          .required(<IntlMessages id='validation.phoneRequired' />),
        whatsapp: yup
          .string()
          .matches(phoneRegExp, messages['validation.invalidWhatsapp'])
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
        password_confirmation: yup
          .string()
          .oneOf(
            [yup.ref('password'), null],
            messages['validation.passwordMisMatch'],
          )
          .required(
            <IntlMessages id='validation.passwordConfrimationRequired' />,
          ),
        second_email: yup.string().nullable(),
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
