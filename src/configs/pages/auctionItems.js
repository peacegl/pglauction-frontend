import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'vehicle.str_code',
      label: messages['common.code'],
    },
    {
      name: 'vehicle.image',
      label: messages['common.image'],
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
      name: 'vehicle.totalCost',
      label: messages['common.totalCost'],
    },
    {
      name: 'vehicle.saleRate',
      label: messages['common.saleRate'],
    },
    {
      name: 'vehicle.year',
      label: messages['common.year'],
    },

    {
      name: 'vehicle.price',
      label: messages['common.price'],
    },
    {
      name: 'vehicle.seller.loginable.fullname',
      label: messages['common.seller'],
    },
    {
      name: 'vehicle.created_by.username',
      label: messages['common.created_by'],
    },
    {
      name: 'vehicle.updated_by.username',
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
