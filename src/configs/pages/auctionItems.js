import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import * as yup from 'yup';

const {messages = []} = appIntl() ? appIntl() : {};
export const tableColumns = function () {
  return [
    {
      name: 'vehicle.str_code',
      label: messages['common.code'],
    },
    {
      name: 'vehicle.vin',
      label: messages['common.vin'],
    },
    {
      name: 'vehicle.lot_number',
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
      name: 'vehicle.seller',
      label: messages['common.seller'],
    },
    {
      name: 'vehicle.created_by',
      label: messages['common.created_by'],
    },
    {
      name: 'vehicle.updated_by',
      label: messages['common.updated_by'],
    },
    {
      name: 'vehicle.created_at',
      label: messages['common.created_at'],
    },
    {
      name: 'vehicle.updated_at',
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
