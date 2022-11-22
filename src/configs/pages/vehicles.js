import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
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
            {tableMeta.tableData[tableMeta.rowIndex]['key']
              .toString()
              .padStart(8, '0')}
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
      label: messages['common.model'],
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
      label: messages['common.primary_damage'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.primary_damage']}: ${v}`;
            }
            return false;
          },
        },
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
      name: 'cylinders',
      label: messages['common.cylinders'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.cylinders']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'fuel',
      label: messages['common.fuel'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.fuel']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'document_type',
      label: messages['common.document_type'],
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.document_type']}: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'odometer',
      label: messages['common.odometer'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography noWrap={true}>{value} Miles</Typography>
        ),
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `${messages['common.odometer']}: ${v}`;
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
    exportColumns: [],
    validationSchema: [
      yup.object({
        year: yup
          .number()
          .typeError(<IntlMessages id='validation.yearNumber' />)
          .min(1900, <IntlMessages id='validation.minYear' />)
          .max(year, <IntlMessages id='validation.maxYear' />)
          .required(<IntlMessages id='validation.yearRequired' />),
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
        color: yup
          .string()
          .required(<IntlMessages id='validation.colorRequired' />),
      }),
      yup.object({
        seller_id: yup
          .string()
          .required(<IntlMessages id='validation.sellerRequired' />),
        location_id: yup
          .string()
          .required(<IntlMessages id='validation.locationRequired' />),
        category_id: yup
          .string()
          .required(<IntlMessages id='validation.categoryRequired' />),
        title: yup
          .string()
          .required(<IntlMessages id='validation.titleRequired' />),
        subtitle: yup
          .string()
          .required(<IntlMessages id='validation.subtitleRequired' />),
        // start_date: yup
        //   .date()
        //   .typeError(<IntlMessages id='validation.dateValidation' />)
        //   .nullable(),
        // end_date: yup
        //   .date()
        //   .typeError(<IntlMessages id='validation.dateValidation' />)
        //   .nullable(),
        minimum_bid: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />),
        // .required(<IntlMessages id='validation.mbidRequired' />),
        buy_now_price: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />)
          .required(<IntlMessages id='validation.buyNowPriceRequired' />),
      }),
      yup.object({
        youtube_url: yup.string().matches(youtubeRegExp, invalidYoutube),
      }),
    ],
  };
}
