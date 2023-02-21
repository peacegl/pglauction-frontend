import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Avatar, Typography} from '@mui/material';
import * as yup from 'yup';
import {CommonConfigs} from 'configs';
const phoneRegExp = CommonConfigs().phoneRegExp;
const {messages = []} = appIntl() ? appIntl() : {};
import CustomerStatus from '../../modules/admin/customers/CustomerStatus';

export const tableColumns = function (
  setRecordId,
  setOpenVerifyModal,
  getSingleCustomer,
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
      name: 'profile',
      label: messages['common.profile'],
      options: {
        download: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Avatar
            alt={'Profile picture'}
            src={value}
            onClick={() => getSingleCustomer(tableMeta.rowData[0])}
            sx={{
              color: (theme) => theme.palette.primary.main,
              cursor: 'pointer',
            }}
          />
        ),
      },
    },
    {
      name: 'str_code',
      label: 'Code',
      options: {
        download: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => getSingleCustomer(tableMeta.rowData[0])}
            noWrap={true}
          >
            {value}
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
      name: 'is_business',
      label: messages['common.account_type'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {value == 0
              ? messages['customer.business_account']
              : messages['customer.individual_account']}
          </Typography>
        ),
      },
    },
    {
      name: 'customer_status',
      label: messages['customer.customer_status'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <CustomerStatus
            value={value}
            id={tableMeta.tableData[tableMeta.rowIndex][0]}
            setRecordId={setRecordId}
            setOpenVerifyModal={setOpenVerifyModal}
          />
        ),
      },
    },
    {
      name: 'status',
      label: messages['common.status'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'company',
      label: messages['common.company'],
    },
    {
      name: 'country',
      label: messages['common.country'],
    },
    {
      name: 'state',
      label: messages['common.state'],
    },
    {
      name: 'city',
      label: messages['common.city'],
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
        url: '/codes/auto_complete?model=Customer&id=',
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
        name: 'customers.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
        keyName: 'username',
      },
      {
        name: 'customers.updated_by',
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
        name: 'customers.customer_status',
        label: 'Customer Status',
        type: 'checkbox',
        items: ['verified', 'unverified', 'pending verification'],
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

export default function configs(
  invalidPhone,
  invalidWhatsapp,
  misMatch,
  edit,
  hideStatus = false,
) {
  return {
    exportColumns: [],
    verifySchema: yup.object({
      customer_status: yup
        .string()
        .required(<IntlMessages id='validation.statusRequired' />),
    }),
    signUpValidation: [
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
        address_line_1: yup
          .string()
          .required(<IntlMessages id='validation.addressLine1Required' />),
        country_id: yup
          .string()
          .required(<IntlMessages id='validation.countryRequired' />),
        state_id: yup
          .string()
          .required(<IntlMessages id='validation.stateRequired' />),
        city: yup
          .string()
          .required(<IntlMessages id='validation.cityRequired' />),
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
        status: hideStatus
          ? yup.string().nullable()
          : yup
              .string()
              .required(<IntlMessages id='validation.statusRequired' />),
        timezone: yup
          .string()
          .required(<IntlMessages id='validation.timezoneRequired' />),
      }),
    ],
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
        // address_line_1: yup
        //   .string()
        //   .required(<IntlMessages id='validation.addressLine1Required' />),
        // country_id: yup
        //   .string()
        //   .required(<IntlMessages id='validation.countryRequired' />),
        // state_id: yup
        //   .string()
        //   .required(<IntlMessages id='validation.stateRequired' />),
        // city: yup
        //   .string()
        //   .required(<IntlMessages id='validation.cityRequired' />),
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
