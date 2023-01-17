import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';
import {CommonConfigs} from 'configs';
const youtubeRegExp = CommonConfigs().youtubeRegExp;
const {messages = []} = appIntl() ? appIntl() : {};
export const tableColumns = function () {
  return [
    {
      name: 'str_code',
      label: messages['common.code'],
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
      name: 'bids_count',
      label: messages['auction.bidsCount'],
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
        minimum_bid: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />),
        // .required(<IntlMessages id='validation.mbidRequired' />),
        buy_now_price: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />)
          .required(<IntlMessages id='validation.buyNowPriceRequired' />),
      }),
      yup.object({}),
    ],
  };
}
