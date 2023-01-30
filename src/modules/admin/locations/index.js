import {filterContent, tableColumns} from '../../../configs/pages/locations';
import {
  onGetLocationList,
  onDeleteLocations,
  onGetAllLocations,
} from 'redux/actions';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import LocationModal from './LocationModal';
import {useEffect, useRef, useState} from 'react';
import {
  ADD_LOCATION,
  EDIT_LOCATION,
  DELETE_LOCATION,
} from 'shared/constants/Permissions';
import PropTypes from 'prop-types';
import DownloadModal from 'components/CustomModal/downloadModal';

export default function LocationList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
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

  //  export data as pdf and Excel states
  const locationTableRef = useRef();
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };

  let data3;
  const exportData = useSelector(({locations}) => {
    data3 = locations.locationsExportData.data;

    if (
      isExportDataEmpty(locations.locationsExportData) ||
      exportDataAmount == 'current_page'
    ) {
      return [];
    } else {
      return locations.locationsExportData.data;
    }
  });
  const fetchExportAllData = async (filteredData = {}) => {
    await dispatch(
      onGetAllLocations({
        page: page + 1,
        per_page: -1,
        filterData: filteredData,
      }),
    );
  };
  // end of for exporting data

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='location.locationList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
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
        // for exporting data
        ref={locationTableRef}
        exportType={exportType}
        exportData={exportData.length == 0 ? data : exportData}
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
        //end for exporting data
      />

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='location.locationDownload' />}
          onDownload={() => {
            if (openDownload && exportDataAmount == 'all') {
              fetchExportAllData();
            } else if (
              openDownload &&
              exportDataAmount == 'filtered_data' &&
              !isExportDataEmpty(filterData)
            ) {
              fetchExportAllData(filterData);
            }
            if (exportDataAmount == 'current_page') {
            }
          }}
          setExportType={setExportType}
          setExportDataAmount={setExportDataAmount}
          exportType={exportType}
          isLoading={loading}
          tableRef={locationTableRef}
          filterData={filterData}
          fetchExportAllData={fetchExportAllData}
          length={data3}
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
    </>
  );
}
LocationList.propTypes = {
  user: PropTypes.any,
};
