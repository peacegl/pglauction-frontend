import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';
import {moneyFormater} from 'configs';

const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function (getSingleSale) {
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
      name: 'str_code',
      label: messages['common.code'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => getSingleSale(tableMeta.rowData[0])}
            noWrap={true}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'vin',
      label: messages['common.vin'],
    },
    {
      name: 'lot_number',
      label: messages['common.lot_number'],
    },
    {
      name: 'buyer',
      label: messages['common.buyer'],
    },
    {
      name: 'sale_price',
      label: messages['sale.salePrice'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {moneyFormater(value)}
          </Typography>
        ),
      },
    },
    {
      name: 'sale_date',
      label: messages['sale.saleDate'],
    },
    {
      name: 'status',
      label: messages['common.status'],
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
        name: 'sales.id',
        label: 'Code',
        type: 'autocomplete',
        url: '/codes/auto_complete?model=Sale&id=',
        keyName: 'str_code',
      },
      {
        name: 'sales.vehicle_id',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete?status=sold&id=',
        keyName: 'lot_number',
      },
      {
        name: 'sales.vehicle_id',
        label: 'Vin',
        type: 'autocomplete',
        url: '/vehicle_vins/auto_complete?status=sold&id=',
        keyName: 'vin',
      },
      {
        name: 'sales.created_by',
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
        name: 'sales.sale_price',
        label: 'Sale Price',
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
        items: ['sold', 'cancelled'],
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
