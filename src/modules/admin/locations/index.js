import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {tableColumns} from 'configs/pages/locations';
import {useDispatch, useSelector} from 'react-redux';
import LocationModal from './LocationModal';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ADD_LOCATION,
  EDIT_LOCATION,
  DELETE_LOCATION,
} from 'shared/constants/Permissions';
import {
  onGetLocationList,
  onDeleteLocations,
  getUserAutocompleteOptions,
} from 'redux/actions';

export default function LocationList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState({});
  const [exactMatch, setExactMatch] = useState(false);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({locations}) => locations.locationData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetLocationList({
        page: page + 1,
        per_page,
        search,
        exactMatch,
        filterData,
        orderBy,
      }),
    );
  };

  const options = {
    count: total,
    rowsPerPage: per_page,
    onChangeRowsPerPage: (numberOfRows) => {
      setPerPage(numberOfRows);
      setPage(0);
    },
    onChangePage: (page) => setPage(page),
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected,
    ) => {
      setSelected(rowsSelected);
    },
    onSearchChange: (value) => {
      setSearch(value);
    },
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
    confirmFilters: true,
    onFilterDialogOpen: () => {
      dispatch(getUserAutocompleteOptions());
    },
    // callback that gets executed when filters are confirmed
    onFilterConfirm: (filterList) => {
      handleFilter(filterList);
    },
    onFilterChange: (column, filterList, type) => {
      if (type === 'chip') {
        handleFilter(filterList);
      }
    },
  };
  const onAdd = () => {
    setRecordId(null);
    setOpenModal(true);
  };

  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteLocations({
        locationIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
        orderBy,
      }),
    );
    setSelected([]);
  };

  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };
  const handleFilter = (filterList) => {
    const filterData = {};
    filterData['locations.name'] = filterList[1][0]
      ? 'like@@' + filterList[1][0].trim()
      : undefined;
    filterData['locations.parent_id'] = filterList[3][0]
      ? 'exact@@' + filterList[3][0]['id']
      : undefined;
    filterData['locations.created_by'] = filterList[4].map((item) => item.id);
    filterData['locations.updated_by'] = filterList[6].map((item) => item.id);
    filterData['locations.created_at'] = {
      from: filterList[5][0],
      to: filterList[5][1],
    };
    filterData['locations.updated_at'] = {
      from: filterList[7][0],
      to: filterList[7][1],
    };
    setFilterData(filterData);
  };

  return (
    <>
      <CustomDataTable
        title='Location List'
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='confirm.location.delete' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={user?.permissions?.includes(ADD_LOCATION)}
        showEditButton={user?.permissions?.includes(EDIT_LOCATION)}
        showDeleteButton={user?.permissions?.includes(DELETE_LOCATION)}
        selectableRows={
          user?.permissions?.includes(EDIT_LOCATION) ||
          user?.permissions?.includes(DELETE_LOCATION)
        }
      />
      {openModal && (
        <LocationModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
LocationList.propTypes = {
  user: PropTypes.any,
};
