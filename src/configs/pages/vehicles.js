import IntlMessages from '@crema/utility/IntlMessages';
import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
const year = new Date().getFullYear();
import * as yup from 'yup';

export default function configs() {
  const {messages = []} = appIntl() ? appIntl() : {};
  return {
    columns: [
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
      {
        name: 'year',
        label: messages['common.year'],
      },
      {
        name: 'color',
        label: messages['common.color'],
      },
      {
        name: 'model',
        label: messages['common.model'],
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
        name: 'engine_type',
        label: messages['common.engine_type'],
      },
      {
        name: 'cylinders',
        label: messages['common.cylinders'],
      },
      {
        name: 'vehicle_type',
        label: messages['common.vehicle_type'],
      },
      {
        name: 'created_by',
        label: messages['common.created_by'],
      },
      {
        name: 'created_at',
        label: messages['common.created_at'],
      },
      {
        name: 'updated_by',
        label: messages['common.updated_by'],
      },
      {
        name: 'updated_at',
        label: messages['common.updated_at'],
      },
    ],
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
