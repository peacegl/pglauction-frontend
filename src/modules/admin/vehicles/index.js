import {filterContent, tableColumns} from 'configs/pages/vehicles';
import DownloadModal from 'components/CustomModal/downloadModal';
import {onGetVehicleData, onDeleteVehicles} from 'redux/actions';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import SaleModal from '../sales/SaleModal';
import VehicleModal from './VehicleModal';
import {useEffect, useState} from 'react';
import {
  ADD_VEHICLE,
  DELETE_VEHICLE,
  EDIT_VEHICLE,
  ADD_SALE,
} from 'shared/constants/Permissions';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

export default function VehicleList({user}) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [recordId, setRecordId] = useState(null);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {loading} = useSelector(({common}) => common);
  const {data = [], total = 0} = useSelector(
    ({vehicles}) => vehicles.vehiclesData,
  );

  //  export data as pdf and Excel states
  const [downloadColumns, setDownloadColumns] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/vehicles`,
      {
        page: 1,
        per_page: -1,
        filterData: filteredData,
      },
      () => {},
      setExportData,
    );
  };
  useEffect(() => {
    setDownloadColumns(tableColumns());
  }, []);
  // end of for exporting data

  const router = useRouter();
  useEffect(() => {
    fetchData('', false, router.query.filteredData);
  }, [
    dispatch,
    page,
    per_page,
    orderBy,
    filterData,
    router.query.filteredData,
  ]);

  const fetchData = async (search = '', exactMatch = false, filteredData) => {
    await dispatch(
      onGetVehicleData({
        page: page + 1,
        per_page,
        search,
        exactMatch,
        filterData: filteredData ? filteredData : filterData,
        orderBy,
      }),
    );
  };
  const options = {
    count: total,
    rowsPerPage: per_page,
    page: page,
    onViewColumnsChange: (changedColumn, action) => {
      onViewColumnsChange(
        changedColumn,
        action,
        setDownloadColumns,
        downloadColumns,
        tableColumns(),
      );
    },
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
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
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
  const onEnterSearch = (value, exactMatch) => {
    setPage(0);
    fetchData(value, exactMatch);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='vehicle.vehicleList' />}
        total={total}
        data={data}
        columns={tableColumns(router)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
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
            ? 'multiple'
            : 'none'
        }
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title={<IntlMessages id='vehicle.filter' />}
          content={filterContent}
        />
      )}

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='vehicle.download' />}
          onDownloadData={async () => {
            if (exportDataAmount == 'all') {
              await fetchExportAllData();
            } else if (exportDataAmount == 'filtered_data') {
              await fetchExportAllData(filterData);
            }
          }}
          setExportType={setExportType}
          setExportDataAmount={setExportDataAmount}
          exportType={exportType}
          filterData={filterData}
          columns={downloadColumns}
          exportData={exportDataAmount == 'current_page' ? data : exportData}
          exportTitle={<IntlMessages id='vehicle.vehicleList' />}
        />
      )}
      {/*end of for exporting data */}

      {openModal && (
        <VehicleModal
          open={openModal}
          toggleOpen={() => {
            setOpenModal((d) => !d);
            setSelected([]);
          }}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
      {showSaleModal && (
        <SaleModal
          open={showSaleModal}
          toggleOpen={() => {
            setShowSaleModal((d) => !d);
            setSelected([]);
          }}
          selectedItem={selectedItems[0]}
        />
      )}
    </>
  );
}
VehicleList.propTypes = {
  user: PropTypes.any,
};
