import {useEffect, useState} from 'react';
import {
  onGetVehicleData,
  onDeleteVehicles,
  getUserAutocompleteOptions,
} from 'redux/actions';
import CustomDataTable from '../../../components/CustomDataTable';
import {useDispatch, useSelector} from 'react-redux';
import {tableColumns} from '../../../configs/pages/vehicles';
import VehicleModal from './VehicleModal';
import IntlMessages from '@crema/utility/IntlMessages';
import SaleModal from '../sales/SaleModal';
import FilterModal from 'components/CustomModal/FilterModal';

export default function VehicleList() {
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

  const handleFilter = (filterList) => {
    const filterData = {};
    filterData['vehicles.year'] = filterList[1][0]
      ? 'like@@' + filterList[1][0].trim()
      : undefined;
    filterData['vehicles.color'] = filterList[2][0]
      ? 'like@@' + filterList[2][0].trim()
      : undefined;
    filterData['vehicles.model'] = filterList[3][0]
      ? 'like@@' + filterList[3][0].trim()
      : undefined;
    filterData['vehicles.engine_type'] = filterList[4][0]
      ? 'like@@' + filterList[4][0].trim()
      : undefined;
    filterData['vehicles.vin'] = filterList[5].map((item) => item.vin);
    filterData['vehicles.lot_number'] = filterList[6].map(
      (item) => item.lot_number,
    );
    filterData['vehicles.cylinder'] = filterList[7][0]
      ? 'like@@' + filterList[7][0].trim()
      : undefined;
    filterData['vehicles.vehicle_type'] = filterList[8][0]
      ? 'like@@' + filterList[8][0].trim()
      : undefined;
    filterData['vehicles.created_by'] = filterList[9].map((item) => item.id);
    filterData['vehicles.updated_by'] = filterList[11].map((item) => item.id);
    filterData['vehicles.created_at'] = {
      from: filterList[10][0],
      to: filterList[10][1],
    };
    filterData['vehicles.updated_at'] = {
      from: filterList[12][0],
      to: filterList[12][1],
    };
    setFilterData(filterData);
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
        onFilter={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        onSell={onSell}
        showSell={true}
        selectedItems={selectedItems}
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
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
