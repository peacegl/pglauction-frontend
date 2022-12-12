import CustomDataTable from '../../../components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import SaleModal from '../sales/SaleModal';
import {useEffect, useState} from 'react';
import {onGetVehicleData, onDeleteVehicles} from 'redux/actions';
import {filterContent, tableColumns} from '../../../configs/pages/vehicles';
import VehicleModal from './VehicleModal';
import FilterModal from 'components/CustomModal/FilterModal';
import PropTypes from 'prop-types';
import {
  ADD_VEHICLE,
  DELETE_VEHICLE,
  EDIT_VEHICLE,
  ADD_SALE,
} from 'shared/constants/Permissions';

export default function VehicleList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [recordId, setRecordId] = useState(null);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({vehicles}) => vehicles.vehiclesData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetVehicleData({
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
    page: page,
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
      setSelectedItems(rowsSelected.map((item) => data[item]));
      setSelected(rowsSelected);
    },
    onSearchChange: (value) => {
      setSearch(value);
    },
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
    // confirmFilters: true,
    // onFilterDialogOpen: () => {
    //   dispatch(getUserAutocompleteOptions());
    // },
    // // callback that gets executed when filters are confirmed
    // onFilterConfirm: (filterList) => {
    //   handleFilter(filterList);
    // },
    // onFilterChange: (column, filterList, type) => {
    //   if (type === 'chip') {
    //     handleFilter(filterList);
    //   }
    // },
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
      onDeleteVehicles({
        vehicleIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
        orderBy,
      }),
    );
    setSelected([]);
  };
  const onSell = () => {
    setShowSaleModal(true);
  };
  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='vehicle.vehicleList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        onSell={onSell}
        showSell={user?.permissions?.includes(ADD_SALE)}
        selectedItems={selectedItems}
        showAddButton={user?.permissions?.includes(ADD_VEHICLE)}
        showEditButton={user?.permissions?.includes(EDIT_VEHICLE)}
        showDeleteButton={user?.permissions?.includes(DELETE_VEHICLE)}
        selectableRows={
          user?.permissions?.includes(EDIT_VEHICLE) ||
          user?.permissions?.includes(DELETE_VEHICLE) ||
          user?.permissions?.includes(ADD_SALE)
        }
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          onApply={(filterData) => {
            setFilterData(filterData);
            setOpenFilter(false);
          }}
          title='Vehicle Filter'
          content={filterContent}
        />
      )}
      {openModal && (
        <VehicleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
      {showSaleModal && (
        <SaleModal
          open={showSaleModal}
          toggleOpen={() => setShowSaleModal((d) => !d)}
          selectedItem={selectedItems[0]}
        />
      )}
    </>
  );
}
VehicleList.propTypes = {
  user: PropTypes.any,
};
