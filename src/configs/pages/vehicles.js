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
            V{value.toString().padStart(8, '0')}
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

export default function configs(invalidYoutube) {
  return {
    fuels: ['petrol', 'diesel', 'etlectric', 'hybrid'],
    statuses: ['active', 'inactive', 'sold', 'pending'],
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
