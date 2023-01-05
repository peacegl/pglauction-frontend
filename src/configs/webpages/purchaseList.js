import {Avatar, Box, Typography} from '@mui/material';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
import ImageIcon from '@mui/icons-material/Image';
import {moneyFormater} from 'configs';

export const tableColumns = function (router) {
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
      name: 'vehicle.id',
      label: messages['common.id'],
      options: {
        display: false,
        viewColumns: false,
      },
    },
    {
      name: 'vehicle.images',
      label: messages['common.image'],
      options: {
        download: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          value?.length && value[0]?.path ? (
            <Box component='img' src={value[0]?.path} width={80} height={60} />
          ) : (
            <Avatar
              alt='Vehicle Image'
              variant='square'
              sx={{width: 80, height: 60}}
            >
              <ImageIcon />
            </Avatar>
          ),
      },
    },
    {
      name: 'vehicle.vin',
      label: messages['common.vin'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography
            sx={{
              textTransform: 'capitalize',
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push(
                `all-vehicles/${tableMeta.tableData[tableMeta.rowIndex][0]}`,
              );
            }}
            noWrap={true}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'vehicle.lot_number',
      label: messages['common.lot_number'],
    },
    {
      name: 'vehicle.year',
      label: messages['common.year'],
    },
    {
      name: 'vehicle.make',
      label: messages['common.make'],
    },
    {
      name: 'vehicle.model',
      label: messages['vehicle.model'],
    },
    {
      name: 'status',
      label: messages['vehicle.status'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'capitalize'}} noWrap={true}>
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'sale_price',
      label: messages['sale.salePrice'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
            {moneyFormater(value)}
          </Typography>
        ),
      },
    },
    {
      name: 'sale_date',
      label: messages['sale.saleData'],
    },
    {
      name: 'description',
      label: messages['common.description'],
    },
  ];
};

export const filterContent = [
  {
    title: 'id_filtering',
    items: [
      {
        name: 'relation@@vehicle.id',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete?id=',
        keyName: 'lot_number',
      },
      {
        name: 'relation@@vehicle.id',
        label: 'Vin',
        type: 'autocomplete',
        url: '/vehicle_vins/auto_complete?id=',
        keyName: 'vin',
      },
      {
        name: 'sales.status',
        label: 'Status',
        type: 'checkbox',
        items: ['sold', 'cancelled', 'pending'],
      },
      {
        name: 'sales.sale_date',
        label: 'Sale Date',
        type: 'date_range',
      },
    ],
  },
  {
    title: 'data',
    items: [
      {
        name: 'sales.sale_price',
        label: 'Sale Price',
        type: 'number_range',
      },
      {
        name: 'vehicle.make',
        label: 'Make',
        type: 'textfield',
      },
      {
        name: 'vehicle.model',
        label: 'model',
        type: 'textfield',
      },
      {
        name: 'relation@@vehicle.year',
        label: 'Year',
        min: 'Start',
        max: 'End',
        type: 'number_range',
      },
    ],
  },
];
