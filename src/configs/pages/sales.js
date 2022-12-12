import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import {createdBy, dateColumn, updatedBy} from '../index';
import * as yup from 'yup';

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
            Sa{value?.toString()?.padStart(5, '0')}
          </Typography>
        ),
      },
    },
    {
      name: 'vin',
      label: messages['common.vin'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Vin: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'lot_number',
      label: messages['common.lot_number'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Lot Number: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'buyer',
      label: messages['common.buyer'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Buyer: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'sale_price',
      label: messages['sale.salePrice'],
      options: {
        filter: false,
      },
    },
    {
      name: 'sale_date',
      label: messages['sale.saleDate'],
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
          names: ['Sold', 'Cancelled', 'Pending'],
        },
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
        name: 'sales.code',
        label: 'Code',
        type: 'autocomplete',
        url: '/sale_codes/auto_complete',
        keyName: 'code',
      },
      {
        name: 'sales.lot_number',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete',
        keyName: 'lot_number',
      },
      {
        name: 'sales.vin',
        label: 'Vin',
        type: 'autocomplete',
        url: '/vehicle_vins/auto_complete',
        keyName: 'vin',
      },
      {
        name: 'created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'sales.updated_by',
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
        name: 'sales.price',
        label: 'Price',
        type: 'number_range',
      },
      {
        name: 'sales.buyer_id',
        label: 'Buyers',
        type: 'autocomplete',
        url: '/user/auto_complete?type=buyer',
        keyName: 'username',
      },
      {
        name: 'sales.status',
        label: 'Status',
        type: 'checkbox',
        items: ['sold', 'cancelled', 'pending'],
      },
    ],
  },
  {
    title: 'date_range',
    items: [
      {
        name: 'sales.sale_date',
        label: 'Sale Date',
        type: 'date_range',
      },
      {
        name: 'sales.created_at',
        label: 'Created At',
        type: 'date_range',
      },
      {
        name: 'sales.updated_at',
        label: 'Updated At',
        type: 'date_range',
      },
    ],
  },
];

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch, edit) {
  return {
    exportColumns: [],
    validationSchemaWithVehicle: yup.object({
      vehicle_id: yup
        .string()
        .required(<IntlMessages id='validation.vehicleRequired' />),
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
