import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import CommonConfigs, {
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  vehicleLot,
  vehicleVin,
} from '../index';
import * as yup from 'yup';

const youtubeRegExp = CommonConfigs().youtubeRegExp;
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
      name: 'title',
      label: messages['common.title'],
      options: {
        filter: false,
      },
    },
    {
      name: 'subtitle',
      label: messages['common.subtitle'],
      options: {
        filter: false,
      },
    },
    {
      name: 'interval',
      label: messages['common.interval'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography noWrap={true}>{value} Hours</Typography>
        ),
      },
    },
    {
      name: 'minimum_bid',
      label: messages['common.minimum_bid'],
    },
    {
      name: 'buy_now_price',
      label: messages['common.buy_now_price'],
    },
    {
      name: 'note',
      label: messages['common.note'],
      options: {
        display: false,
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
          names: ['Active', 'Pending', 'Sold'],
        },
      },
    },
    {
      name: 'seller',
      label: messages['common.seller'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Seller: ${v}`;
            }
            return false;
          },
        },
      },
    },
    createdBy(),
    createdAt,
    updatedBy(),
    updatedAt,
  ];
};

export default function configs(invalidYoutube) {
  return {
    exportColumns: [],
    validationSchema: [
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
        start_date: yup
          .date()
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .nullable(),
        end_date: yup
          .date()
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .nullable(),
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
