import PermissionsConfigs from 'configs/pages/permissions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionList, onGetAllPermission} from 'redux/actions';
import {useEffect, useRef, useState} from 'react';
import DownloadModal from 'components/CustomModal/downloadModal';

export default function UserList() {
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({permissions}) => permissions.permissionList,
  );
  const filterData = useSelector(({permissions}) => permissions.filterData);
  const {loading} = useSelector(({common}) => common);
  const columns = PermissionsConfigs().columns;
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetPermissionList({
        page: page + 1,
        per_page,
        search,
        filterData,
        orderBy,
      }),
    );
  };

  const options = {
    count: total,
    rowsPerPage: per_page,
    selectableRows: false,
    onChangeRowsPerPage: (numberOfRows) => {
      setPerPage(numberOfRows);
      setPage(0);
    },
    onChangePage: (page) => setPage(page),
    onSearchChange: (value) => {
      setSearch(value);
    },
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
  };
  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  //  export data as pdf and Excel states
  const perTableRef = useRef();
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };

  const exportData = useSelector(({permissions}) => {
    if (
      isExportDataEmpty(permissions.perExportData) ||
      exportDataAmount == 'current_page' ||
      permissions.perExportData.length == 0
    ) {
      return [];
    } else {
      return permissions.perExportData.data;
    }
  });

  useEffect(() => {
    if (openDownload && exportDataAmount == 'all') {
      fetchExportAllData();
    } else if (
      openDownload &&
      exportDataAmount == 'filtered_data' &&
      !isExportDataEmpty(filterData)
    ) {
      fetchExportAllData(filterData);
    }
  }, [dispatch, openDownload, exportDataAmount]);

  const fetchExportAllData = async (filteredData = {}) => {
    await dispatch(
      onGetAllPermission({
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
        title={<IntlMessages id='permission.permissionList' />}
        total={total}
        data={data}
        columns={columns}
        options={options}
        isLoading={loading}
        onEnterSearch={onEnterSearch}
        // for exporting data
        ref={perTableRef}
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
          title={<IntlMessages id='permission.permissionDownload' />}
          onDownload={() => {
            perTableRef.current.download();
          }}
          setExportType={setExportType}
          setExportDataAmount={setExportDataAmount}
          exportType={exportType}
          isLoading={loading}
        />
      )}
      {/*end of for exporting data */}
    </>
  );
}
