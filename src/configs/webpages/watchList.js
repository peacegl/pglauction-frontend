import {Avatar, Box, Typography} from '@mui/material';
import {appIntl} from '@crema/utility/helper/Utils';
const {messages = []} = appIntl() ? appIntl() : {};
import ImageIcon from '@mui/icons-material/Image';

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
      name: 'images',
      label: messages['common.image'],
      options: {
        download: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          value[0]?.path ? (
            <Box component='img' src={value[0]?.path} width={60} height={45} />
          ) : (
            <Avatar
              alt='Vehicle Image'
              variant='square'
              sx={{width: 60, height: 45}}
            >
              <ImageIcon />
            </Avatar>
          ),
      },
    },
    {
      name: 'vin',
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
                `/all-vehicles/${tableMeta.tableData[tableMeta.rowIndex][0]}`,
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
      name: 'lot_number',
      label: messages['common.lot_number'],
    },
    {
      name: 'year',
      label: messages['common.year'],
    },
    {
      name: 'make',
      label: messages['common.make'],
    },
    {
      name: 'model',
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
      name: 'exterior_color',
      label: messages['vehicle.exterior_color'],
    },
    {
      name: 'interior_color',
      label: messages['vehicle.interior_color'],
    },
    {
      name: 'primary_damage',
      label: messages['vehicle.primary_damage'],
    },
    {
      name: 'keys',
      label: messages['common.keys'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? messages['common.yes'] : messages['common.no'],
      },
    },
    {
      name: 'fuel',
      label: messages['common.fuel'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'capitalize'}}>{value}</Typography>
        ),
      },
    },
    {
      name: 'odometer_type',
      label: messages['vehicle.odometer'],
    },
    {
      name: 'transmission',
      label: messages['common.transmission'],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'capitalize'}} noWrap={true}>
            {value}
          </Typography>
        ),
      },
    },
    {
      name: 'engine_type',
      label: messages['common.engine_type'],
    },
    {
      name: 'document_type',
      label: messages['vehicle.document_type'],
    },
  ];
};

export const filterContent = [
  {
    title: 'id_filtering',
    items: [
      {
        name: 'vehicles.id',
        label: 'Lot Number',
        type: 'autocomplete',
        url: '/vehicle_lots/auto_complete?id=',
        keyName: 'lot_number',
      },
      {
        name: 'vehicles.id',
        label: 'Vin',
        type: 'autocomplete',
        url: '/vehicle_vins/auto_complete?id=',
        keyName: 'vin',
      },
      {
        name: 'vehicles.status',
        label: 'Status',
        type: 'checkbox',
        items: ['available', 'sold', 'future'],
      },
    ],
  },
  {
    title: 'data',
    items: [
      {
        name: 'vehicles.make',
        label: 'Make',
        type: 'textfield',
      },
      {
        name: 'vehicles.model',
        label: 'model',
        type: 'textfield',
      },
      {
        name: 'vehicles.year',
        label: 'Year',
        min: 'Start',
        max: 'End',
        type: 'number_range',
      },
      {
        name: 'vehicles.odometer',
        label: 'Odometer',
        type: 'number_range',
      },
      {
        name: 'vehicles.body_style',
        label: 'Body Styles',
        type: 'checkbox',
        items: [
          'sedan',
          'suv',
          'coupe',
          'hatchback',
          'convertible',
          'wagon',
          'pickup',
          'minivan',
          'van',
        ],
      },
      {
        name: 'vehicles.transmission',
        label: 'Transmission',
        type: 'checkbox',
        items: ['automatic', 'manual'],
      },
    ],
  },
];
