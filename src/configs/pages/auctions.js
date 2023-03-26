import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
import {Typography} from '@mui/material';
import * as yup from 'yup';
import moment from 'moment';
import 'moment-timezone';

export const tableColumns = function (router, showAuctionVehicles) {
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
            onClick={() => {
              router.push(`/admin/auctions/${tableMeta.rowData[0]}`);
            }}
            noWrap={true}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'name',
      label: messages['common.name'],
    },
    {
      name: 'start_date',
      label: messages['common.startDate'],
    },
    {
      name: 'end_date',
      label: messages['common.endDate'],
    },
    {
      name: 'items_count',
      label: messages['auction.VehiclesCount'],
      options: {
        download: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => showAuctionVehicles(tableMeta.rowData[0])}
            noWrap={true}
          >
            {value +
              ' ' +
              `${
                value > 1
                  ? messages['sidebar.vehicles']
                  : messages['common.vehicle']
              }`}
          </Typography>
        ),
      },
    },
    {
      name: 'status',
      label: messages['common.status'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              textTransform: 'capitalize',
              color: value == 'active' ? 'green' : 'red',
            }}
          >
            {value}
          </Typography>
        ),
      },
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

export default function configs(initialValues) {
  return {
    exportColumns: [],
    itemSchema: yup.object({
      minimum_bid: yup
        .number()
        .typeError(<IntlMessages id='validation.priceError' />)
        .required(<IntlMessages id='validation.minimumBidRequired' />),
      buy_now_price: yup
        .number()
        .when('minimum_bid', (minimum_bid, schema) => {
          return schema.test({
            test: (buy_now_price) =>
              !!minimum_bid && buy_now_price > minimum_bid,
            message: <IntlMessages id='validation.buyNowPriceMustBeBigger' />,
          });
        })
        .typeError(<IntlMessages id='validation.priceError' />)
        .required(<IntlMessages id='validation.minimumBidRequired' />),
    }),
    validationSchema: [
      yup.object({
        name: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.nameRequired' />),
        status: yup
          .string()
          .required(<IntlMessages id='validation.statusRequired' />),
        start_date: yup
          .date()
          // .min(new Date(), <IntlMessages id='validation.pastDateNotAllowed' />)
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .required(<IntlMessages id='validation.startDateRequired' />),
        end_date: yup
          .date()
          .min(new Date(), <IntlMessages id='validation.pastDateNotAllowed' />)
          .when('start_date', {
            is: (start_date) => {
              return !!start_date ? true : false;
            },
            then: yup
              .date()
              // .min(
              //   yup.ref('start_date'),
              //   <IntlMessages id='validation.endDateMustBeBigger' />,
              // )
              .typeError(<IntlMessages id='validation.dateValidation' />)
              .required(<IntlMessages id='validation.startDateRequired' />),
          })
          .typeError(<IntlMessages id='validation.dateValidation' />)
          .required(<IntlMessages id='validation.startDateRequired' />),
      }),
    ],
  };
}
