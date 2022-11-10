import IntlMessages from '@crema/utility/IntlMessages';
import {Typography} from '@mui/material';
const year = new Date().getFullYear();
import * as yup from 'yup';

export default function configs() {
  return {
    columns: [
      {
        name: 'code',
        label: 'Code',
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
      {
        name: 'vin',
        label: 'Vin',
      },
      {
        name: 'lot_number',
        label: 'Lot Number',
      },
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
      },
      {
        name: 'start_date',
        label: 'Start Date',
      },
      {
        name: 'end_date',
        label: 'End Date',
      },
      {
        name: 'minimum_bid',
        label: 'Minimum Bid',
      },
      {
        name: 'buy_now_price',
        label: 'Buy Now Price',
      },
      {
        name: 'note',
        label: 'Note',
        options: {
          display: 'false',
        },
      },
      {
        name: 'status',
        label: 'Status',
      },
      {
        name: 'seller',
        label: 'Seller',
      },
      {
        name: 'created_by',
        label: 'Created by',
      },
      {
        name: 'created_at',
        label: 'Created At',
      },
      {
        name: 'updated_by',
        label: 'Updated by',
      },
      {
        name: 'updated_at',
        label: 'Updated At',
      },
    ],
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
        minimum_bid: yup.number(),
        // .typeError(<IntlMessages id='validation.priceError' />)
        // .required(<IntlMessages id='validation.mbidRequired' />),
        buy_now_price: yup
          .number()
          .typeError(<IntlMessages id='validation.priceError' />)
          .required(<IntlMessages id='validation.buyNowPriceRequired' />),
      }),
    ],
  };
}
