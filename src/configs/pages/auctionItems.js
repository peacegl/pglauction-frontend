import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import CommonConfigs, {
  createdBy,
  dateColumn,
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
          </Typography>
        ),
      },
    },
    {
      name: 'vin',
      label: messages['common.year'],
    },
    {
      name: 'lot_number',
      label: messages['common.lot_number'],
    },
    {
      name: 'title',
      label: messages['common.title'],
    },
    {
      name: 'subtitle',
      label: messages['common.subtitle'],
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
    },
    {
      name: 'status',
      label: messages['common.status'],
    },
    {
      name: 'seller',
      label: messages['common.seller'],
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
