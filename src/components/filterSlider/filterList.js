import MinMaxFilter from './filterComponents/MinMaxFilter';
import MinMaxSlider from './filterComponents/MinMaxSlider';
import {setWebVehiclesFilter} from '../../redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import ListItems from './filterComponents/ListItems';
import VehicleConfigs from 'configs/pages/vehicles';
import {Box, MenuItem} from '@mui/material';
import NewlyAdded from './NewlyAdded';
import {range} from 'configs';

export default function filterList(filterData, messages, reset, setReset) {
  return {
    filterItems: [
      {
        key: 1,
        title: <IntlMessages id='filter.newly_added' />,
        name: 'newly_added',
        initialValue: {
          newly_added_duration: 24,
          newly_added: 0,
        },
        content: (
          <NewlyAdded
            filterData={filterData}
            reduxReducer={setWebVehiclesFilter}
          />
        ),
      },
      {
        key: 2,
        title: <IntlMessages id='common.price' />,
        name: 'between@@price',
        initialValue: [0, 100000],
        content: (
          <MinMaxSlider
            value={filterData['between@@price']}
            step={100}
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='between@@price'
            onlyTitle
            price
            reset={reset}
            setReset={setReset}
          />
        ),
      },
      {
        key: 3,
        title: <IntlMessages id='common.location' />,
        name: 'location_id',
        initialValue: [],
        content: (
          <ListItems
            url='/location/auto_complete'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='location_id'
          />
        ),
      },
      {
        key: 4,
        title: <IntlMessages id='vehicle.category' />,
        name: 'category_id',
        initialValue: [],
        content: (
          <ListItems
            url='/category/auto_complete'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='category_id'
          />
        ),
      },
      {
        key: 5,
        title: <IntlMessages id='vehicle.odometer' />,
        name: 'between@@odometer',
        initialValue: [0, 250000],
        content: (
          <MinMaxSlider
            value={filterData['between@@odometer']}
            minTitle={messages['common.miles']}
            maxTitle={messages['common.miles']}
            step={1000}
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='between@@odometer'
            reset={reset}
            setReset={setReset}
          />
        ),
      },
      {
        key: 6,
        title: <IntlMessages id='common.year' />,
        name: 'between@@year',
        initialValue: [1995, new Date().getFullYear()],
        content: (
          <MinMaxFilter
            value={filterData['between@@year']}
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='between@@year'
            select
            items={range(1950, new Date().getFullYear() + 1, 1).map(
              (year, index) => (
                <MenuItem value={year} key={index}>
                  {year}
                </MenuItem>
              ),
            )}
          />
        ),
      },
      {
        key: 7,
        title: <IntlMessages id='common.make' />,
        name: 'make',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=make'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='make'
            customColumn='make'
          />
        ),
      },
      {
        key: 8,
        title: <IntlMessages id='vehicle.model' />,
        name: 'model',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=model'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='model'
            customColumn='model'
          />
        ),
      },
      {
        key: 9,
        title: <IntlMessages id='common.engine_type' />,
        name: 'engine_type',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=engine_type'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='engine_type'
            customColumn='engine_type'
          />
        ),
      },
      {
        key: 10,
        title: <IntlMessages id='vehicle.transmission' />,
        name: 'transmission',
        initialValue: [],
        content: (
          <ListItems
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='transmission'
            hideSearch
            items={VehicleConfigs().transmissions.map((transmission) => {
              return {
                id: transmission,
                name: (
                  <Box sx={{textTransform: 'capitalize'}}>{transmission}</Box>
                ),
              };
            })}
          />
        ),
      },
      {
        key: 11,
        title: <IntlMessages id='vehicle.fuel' />,
        name: 'fuel',
        initialValue: [],
        content: (
          <ListItems
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='fuel'
            hideSearch
            items={VehicleConfigs().fuels.map((fuel) => {
              return {
                id: fuel,
                name: <Box sx={{textTransform: 'capitalize'}}>{fuel}</Box>,
              };
            })}
          />
        ),
      },
      {
        key: 12,
        title: <IntlMessages id='common.cylinder' />,
        name: 'cylinder',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=cylinder'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='cylinder'
            customColumn='cylinder'
          />
        ),
      },
      {
        key: 13,
        title: <IntlMessages id='vehicle.interior_color' />,
        name: 'interior_color',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=interior_color'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='interior_color'
            customColumn='interior_color'
          />
        ),
      },
      {
        key: 14,
        title: <IntlMessages id='vehicle.exterior_color' />,
        name: 'exterior_color',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=exterior_color'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='exterior_color'
            customColumn='exterior_color'
          />
        ),
      },
      {
        key: 15,
        title: <IntlMessages id='vehicle.document_type' />,
        name: 'document_type',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=document_type'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='document_type'
            customColumn='document_type'
          />
        ),
      },
      {
        key: 16,
        title: <IntlMessages id='vehicle.body_style' />,
        name: 'body_style',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=body_style'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='body_style'
            customColumn='body_style'
          />
        ),
      },
      {
        key: 17,
        title: <IntlMessages id='vehicle.drive_type' />,
        name: 'drive_type',
        initialValue: [],
        content: (
          <ListItems
            url='/vehicleColumn/auto_complete?column=drive_type'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='drive_type'
            customColumn='drive_type'
          />
        ),
      },
      {
        key: 18,
        title: <IntlMessages id='common.status' />,
        name: 'status',
        initialValue: [],
        content: (
          <ListItems
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='status'
            hideSearch
            items={[
              {
                id: 'active',
                name: 'Future',
              },
              {
                id: 'sold',
                name: 'Sold',
              },
            ]}
          />
        ),
      },
      {
        key: 19,
        title: <IntlMessages id='vehicle.keys' />,
        name: 'keys',
        initialValue: [],
        content: (
          <ListItems
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='keys'
            hideSearch
            items={[
              {
                id: 0,
                name: <IntlMessages id='common.no' />,
              },
              {
                id: 1,
                name: <IntlMessages id='common.yes' />,
              },
            ]}
          />
        ),
      },
      {
        key: 20,
        title: <IntlMessages id='vehicle.test_drive' />,
        name: 'test_drive',
        initialValue: [],
        content: (
          <ListItems
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='test_drive'
            hideSearch
            items={[
              {
                id: 0,
                name: <IntlMessages id='common.no' />,
              },
              {
                id: 1,
                name: <IntlMessages id='common.yes' />,
              },
            ]}
          />
        ),
      },
    ],
  };
}
