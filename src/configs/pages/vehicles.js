import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Typography} from '@mui/material';
const year = new Date().getFullYear();
import * as yup from 'yup';
import {CommonConfigs, moneyFormater} from 'configs';
import {appIntl} from '@crema/utility/helper/Utils';
const youtubeRegExp = CommonConfigs().youtubeRegExp;
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            V{value.toString().padStart(8, '0')}
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
      name: 'price',
      label: messages['common.totalCost'],
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
      name: 'sale_rate',
      label: messages['common.saleRate'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {value}%
          </Typography>
        ),
      },
    },
    {
      name: 'price',
      label: messages['common.price'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {moneyFormater(
              parseInt(value) + parseInt((value * tableMeta?.rowData[4]) / 100),
            )}
          </Typography>
        ),
      },
    },
    {
      name: 'year',
      label: messages['common.year'],
    },
    {
      name: 'make',
      label: messages['common.make'],
    },
    {
      name: 'model',
      label: messages['vehicle.model'],
    },
    {
      name: 'status',
      label: messages['vehicle.status'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Box sx={{display: 'flex'}}>
            <Typography
              sx={{
                textTransform: 'capitalize',
              }}
            >
              {value}
            </Typography>
          </Box>
        ),
      },
    },
    {
      name: 'exterior_color',
      label: messages['vehicle.exterior_color'],
    },
    {
      name: 'interior_color',
      label: messages['vehicle.interior_color'],
    },
    {
      name: 'primary_damage',
      label: messages['vehicle.primary_damage'],
    },
    {
      name: 'is_featured',
      label: messages['vehicle.is_featured'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? messages['common.yes'] : messages['common.no'],
      },
    },
    {
      name: 'is_best_selling',
      label: messages['vehicle.is_best_selling'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? messages['common.yes'] : messages['common.no'],
      },
    },
    {
      name: 'engine_type',
      label: messages['common.engine_type'],
    },
    {
      name: 'document_type',
      label: messages['vehicle.document_type'],
    },
    {
      name: 'odometer_type',
      label: messages['vehicle.odometer_type'],
    },
    {
      name: 'transmission',
      label: messages['common.transmission'],
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
        name: 'vehicles.id',
        label: 'Code',
        type: 'autocomplete',
        url: '/codes/auto_complete?model=Vehicle&id=',
        keyName: 'str_code',
      },
      {
        name: 'vehicles.id',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete?id=',
        keyName: 'lot_number',
      },
      {
        name: 'vehicles.id',
        label: 'Vin',
        type: 'autocomplete',
        url: '/vehicle_vins/auto_complete?id=',
        keyName: 'vin',
      },
      {
        name: 'vehicles.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
        keyName: 'username',
      },
      {
        name: 'vehicles.updated_by',
        label: 'Updated By',
        type: 'autocomplete',
        url: '/user/auto_complete?id=',
        keyName: 'username',
      },
      {
        name: 'vehicles.status',
        label: 'Status',
        type: 'checkbox',
        items: ['available', 'sold', 'inactive', 'future'],
      },
    ],
  },
  {
    title: 'data',
    items: [
      {
        name: 'vehicles.make',
        label: 'Make',
        type: 'textfield',
      },
      {
        name: 'vehicles.model',
        label: 'model',
        type: 'textfield',
      },
      {
        name: 'vehicles.price',
        label: 'Price',
        type: 'number_range',
      },
      {
        name: 'vehicles.year',
        label: 'Year',
        min: 'Start',
        max: 'End',
        type: 'number_range',
      },
      {
        name: 'vehicles.odometer',
        label: 'Odometer',
        type: 'number_range',
      },
      {
        name: 'vehicles.body_style',
        label: 'Body Styles',
        type: 'checkbox',
        items: [
          'sedan',
          'suv',
          'coupe',
          'hatchback',
          'convertible',
          'wagon',
          'pickup',
          'minivan',
          'van',
        ],
      },
      {
        name: 'vehicles.transmission',
        label: 'Transmission',
        type: 'checkbox',
        items: ['automatic', 'manual'],
      },
    ],
  },
  {
    title: 'date_range',
    items: [
      {
        name: 'vehicles.created_at',
        label: 'Created At',
        type: 'date_range',
      },
      {
        name: 'vehicles.updated_at',
        label: 'Updated At',
        type: 'date_range',
      },
    ],
  },
];

export default function configs(invalidYoutube) {
  return {
    fuels: ['petrol', 'diesel', 'etlectric', 'hybrid'],
    statuses: ['available', 'inactive', 'sold', 'future'],
    transmissions: ['automatic', 'manual'],
    bodyStyles: [
      'sedan',
      'suv',
      'coupe',
      'hatchback',
      'convertible',
      'wagon',
      'pickup',
      'minivan',
      'van',
    ],
    priceGuidances: ['great_price', 'good_price', 'fair_price'],
    exportColumns: [],
    validationSchema: [
      yup.object({
        year: yup
          .number()
          .typeError(<IntlMessages id='validation.yearNumber' />)
          .min(1900, <IntlMessages id='validation.minYear' />)
          .max(year, <IntlMessages id='validation.maxYear' />)
          .required(<IntlMessages id='validation.yearRequired' />),
        make: yup
          .string()
          .required(<IntlMessages id='validation.makeRequired' />),
        model: yup
          .string()
          .required(<IntlMessages id='validation.modelRequired' />),
        vin: yup
          .string()
          .required(<IntlMessages id='validation.vinRequired' />),
        lot_number: yup
          .number()
          .typeError(<IntlMessages id='validation.lotNumber' />)
          .required(<IntlMessages id='validation.lotRequired' />),
        price: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />)
          .required(<IntlMessages id='validation.priceRequired' />),
        sale_rate: yup
          .number()
          .typeError(<IntlMessages id='validation.saleRateError' />),
      }),
      yup.object({
        status: yup
          .string()
          .required(<IntlMessages id='validation.statusRequired' />),
        location_id: yup
          .string()
          .required(<IntlMessages id='validation.locationRequired' />),
      }),
      yup.object({
        youtube_url: yup.string().matches(youtubeRegExp, invalidYoutube),
      }),
    ],
  };
}
