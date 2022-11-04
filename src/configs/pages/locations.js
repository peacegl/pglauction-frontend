import IntlMessages from '@crema/utility/IntlMessages';
import {Typography} from '@mui/material';
import * as yup from 'yup';
import {appIntl} from '@crema/utility/helper/Utils';

export default function conifgs() {
  // const {messages} = appIntl();
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
                .padStart(5, '0')}
            </Typography>
          ),
        },
      },
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'slug',
        label: 'Slug',
      },
      {
        name: 'parent.name',
        label: 'Parent Name',
      },
      {
        name: 'description',
        label: 'Description',
      },
      {
        name: 'created_by.username',
        label: 'Created by',
      },
      {
        name: 'updated_by.username',
        label: 'Updated by',
      },
    ],
    exportColumns: [],
    validationSchema:
      false &&
      yup.object({
        firstname: yup
          .string()
          .required(<IntlMessages id='validation.firstnameRequired' />),
        lastname: yup
          .string()
          .required(<IntlMessages id='validation.lastnameRequired' />),
        gender: yup
          .string()
          .required(<IntlMessages id='validation.genderRequired' />),
      }),
    insertColumns: [
      'vin',
      'lot_number',
      'year',
      'model',
      'color',
      'engine_type',
      'cylinders',
      'vehicle_type',
      'seller_id',
      'location_id',
      'category_id',
      'title',
      'subtitle',
      'start_date',
      'end_date',
      'minimum_bid',
      'buy_now_price',
      'description',
      'youtube_url',
      'note',
    ],
  };
}
