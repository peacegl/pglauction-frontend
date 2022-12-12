import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Box, Typography} from '@mui/material';
const year = new Date().getFullYear();
import * as yup from 'yup';
import CommonConfigs, {
  createdBy,
  dateColumn,
  updatedBy,
  vehicleLot,
  vehicleVin,
} from 'configs';
const {messages = []} = appIntl() ? appIntl() : {};
const youtubeRegExp = CommonConfigs().youtubeRegExp;

export const tableColumns = function () {
  return [
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {value}
          </Typography>
        ),
      },
    },
    vehicleVin(),
    vehicleLot(),
    {
      name: 'price',
      label: messages['common.price'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {value} DH
          </Typography>
        ),
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.price']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'year',
      label: messages['common.year'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.year']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'make',
      label: messages['common.make'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.make']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'model',
      label: messages['vehicle.model'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.model']}: ${v}`;
            }
            return false;
          },
        },
      },
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
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['vehicle.exterior_color']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'interior_color',
      label: messages['vehicle.interior_color'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['vehicle.interior_color']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'primary_damage',
      label: messages['vehicle.primary_damage'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['vehicle.primary_damage']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'is_featured',
      label: messages['vehicle.is_featured'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? messages['common.yes'] : messages['common.no'],
      },
    },
    {
      name: 'is_best_selling',
      label: messages['vehicle.is_best_selling'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? messages['common.yes'] : messages['common.no'],
      },
    },
    {
      name: 'engine_type',
      label: messages['common.engine_type'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.engine_type']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'document_type',
      label: messages['vehicle.document_type'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['vehicle.document_type']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'odometer',
      label: messages['vehicle.odometer'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography noWrap={true}>{value} Miles</Typography>
        ),
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['vehicle.odometer']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'transmission',
      label: messages['common.transmission'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.transmission']}: ${v}`;
            }
            return false;
          },
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
        name: 'vehicles.code',
        label: 'Code',
        type: 'autocomplete',
        url: '/vehicle_codes/auto_complete',
        keyName: 'code',
      },
      {
        name: 'vehicles.lot_number',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete',
        keyName: 'lot_number',
      },
      {
        name: 'vehicles.vin',
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
        name: 'vehicles.updated_by',
        label: 'Updated By',
        type: 'autocomplete',
        url: '/user/auto_complete',
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
      }),
      yup.object({
        status: yup
          .string()
          .required(<IntlMessages id='validation.statusRequired' />),
        location_id: yup
          .string()
          .required(<IntlMessages id='validation.locationRequired' />),
        seller_id: yup
          .string()
          .required(<IntlMessages id='validation.sellerRequired' />),
        odometer: yup
          .number()
          .typeError(<IntlMessages id='validation.numberError' />),
      }),
      yup.object({
        youtube_url: yup.string().matches(youtubeRegExp, invalidYoutube),
      }),
    ],
  };
}
