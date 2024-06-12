import {filterContent, tableColumns} from 'configs/pages/locations';
import {
  onGetLocationList,
  onDeleteLocations,
  addRealTimeLocation,
  updateRealTimeLocation,
  addRealTimeLocationCount,
} from 'redux/actions';
import DownloadModal from 'components/CustomModal/downloadModal';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import LocationModal from './LocationModal';
import {useEffect, useState} from 'react';
import {
  ADD_LOCATION,
  EDIT_LOCATION,
  DELETE_LOCATION,
} from 'shared/constants/Permissions';
import SingleLocationModal from './SingleLocationModal';
import PropTypes from 'prop-types';

 

export default function LocationList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [singleLocation, setSingleLocation] = useState([]);
  const [showSingleLocationModal, setShowSingleLocationModal] = useState(false);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({locations}) => locations.locationData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '', exactMatch = false) => {
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
      onDeleteLocations({
        locationIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
        orderBy,
      }),
    );
    setSelected([]);
  };

  const onEnterSearch = (value, exactMatch) => {
    setPage(0);
    fetchData(value, exactMatch);
  };

  //  export data as pdf and Excel states
  const [exportData, setExportData] = useState([]);
  const [downloadColumns, setDownloadColumns] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/locations`,
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

  useEffect(() => {
     
    window.echo.private(`update.location`).listen('Updated', (e) => {
      if (user.uid != e.authUser) {
        if (e.action === 'created') {
          newLocationRealTime(e.data);
        }
        if (e.action == 'updated') {
          updateLocationRealTime(e.data);
        }
        if (e.action == 'deleted') {
          fetchData();
        }
      }
    });
    return () => {
      const echoChannel = window.echo.private(`update.location`);
      echoChannel.stopListening('Updated');
      window.echo.leave(`update.location`);
    };
  }, []);

  const newLocationRealTime = async (data) => {
    if (page == 0) {
      await dispatch(addRealTimeLocation(data));
    } else {
      await dispatch(addRealTimeLocationCount(data));
    }
  };

  const updateLocationRealTime = async (data) => {
    await dispatch(updateRealTimeLocation(data));
  };

  const getSingleLocation = (id) => {
    setSingleLocation(data.filter((sale) => sale.id === id)[0]);
    setShowSingleLocationModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='location.locationList' />}
        total={total}
        data={data}
        columns={tableColumns(getSingleLocation)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='confirm.location.delete' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        showAddButton={user?.permissions?.includes(ADD_LOCATION)}
        showEditButton={user?.permissions?.includes(EDIT_LOCATION)}
        showDeleteButton={user?.permissions?.includes(DELETE_LOCATION)}
        selectableRows={
          user?.permissions?.includes(EDIT_LOCATION) ||
          user?.permissions?.includes(DELETE_LOCATION)
            ? 'multiple'
            : 'none'
        }
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
      />

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='location.locationDownload' />}
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
          exportTitle={<IntlMessages id='location.locationList' />}
        />
      )}
      {/*end of for exporting data */}

      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title='Locations Filter'
          content={filterContent}
        />
      )}

      {openModal && (
        <LocationModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}

      {showSingleLocationModal && (
        <SingleLocationModal
          open={showSingleLocationModal}
          toggleOpen={() => setShowSingleLocationModal((d) => !d)}
          singleLocation={singleLocation}
          width={500}
        />
      )}
    </>
  );
}
LocationList.propTypes = {
  user: PropTypes.any,
};
