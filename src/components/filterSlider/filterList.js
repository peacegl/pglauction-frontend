import MinMaxFilter from './filterComponents/MinMaxFilter';
import MinMaxSlider from './filterComponents/MinMaxSlider';
import {setWebVehiclesFilter} from '../../redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import ListItems from './filterComponents/ListItems';
import {MenuItem} from '@mui/material';
import NewlyAdded from './NewlyAdded';
import {range} from 'configs';

export default function filterList(filterData, messages) {
  return {
    filterItems: [
      {
        key: 1,
        title: <IntlMessages id='filter.newly_added' />,
        content: <NewlyAdded filterData={filterData} />,
      },
      {
        key: 2,
        title: <IntlMessages id='common.price' />,
        content: (
          <MinMaxSlider value={filterData.price} step={100} onlyTitle price />
        ),
      },
      {
        key: 3,
        title: <IntlMessages id='vehicle.odometer' />,
        content: (
          <MinMaxSlider
            value={filterData.odometer}
            minTitle={messages['common.miles']}
            maxTitle={messages['common.miles']}
            step={1000}
          />
        ),
      },
      {
        key: 4,
        title: <IntlMessages id='common.year' />,
        content: (
          <MinMaxFilter
            value={filterData.year}
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='year'
            select
            items={range(1950, new Date().getFullYear() + 1, 1).map((year) => (
              <MenuItem value={year} key={year}>
                {year}
              </MenuItem>
            ))}
          />
        ),
      },
      {
        key: 5,
        title: <IntlMessages id='common.make' />,
        content: (
          <ListItems
            url='/make/auto_complete'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='make'
          />
        ),
      },
      {
        key: 6,
        title: <IntlMessages id='vehicle.model' />,
        content: (
          <ListItems
            url='/make/auto_complete'
            reduxReducer={setWebVehiclesFilter}
            data={filterData}
            columnName='make'
          />
        ),
      },
    ],
  };
}
