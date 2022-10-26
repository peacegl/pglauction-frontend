export default function () {
  return {
    columns: [
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
  };
}
