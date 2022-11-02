import IntlMessages from '@crema/utility/IntlMessages';
const year = new Date().getFullYear();
import * as yup from 'yup';

export default function configs() {
  return {
    columns: [
      {
        name: 'code',
        label: 'Code',
      },
      {
        name: 'year',
        label: 'Year',
      },
      {
        name: 'color',
        label: 'Color',
      },
      {
        name: 'model',
        label: 'Model',
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
        name: 'engine_type',
        label: 'Engine Type',
      },
      {
        name: 'cylinders',
        label: 'Cylinders',
      },
      {
        name: 'vehicle_type',
        label: 'Vehicle Type',
      },
      {
        name: 'created_by',
        label: 'Created By',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value.username,
        },
      },
      {
        name: 'updated_by',
        label: 'Updated By',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value.username,
        },
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
