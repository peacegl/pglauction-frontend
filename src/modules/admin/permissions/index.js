import DownloadModal from 'components/CustomModal/downloadModal';
import {tableColumns} from 'configs/pages/permissions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {getData, onViewColumnsChange} from 'configs';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionList} from 'redux/actions';
import {useEffect, useState} from 'react';
import SinglePermissionModal from './SinglePermissionModal';
import PermissionUsersModal from './permissionUsersModal';
import PermissionRolesModal from './PermissionRolesModal';

export default function UserList() {
  const [singlePermission, setSinglePermission] = useState([]);
  const [showSinglePermissionModal, setShowSinglePermissionModal] =
    useState(false);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({permissions}) => permissions.permissionList,
  );
  const filterData = useSelector(({permissions}) => permissions.filterData);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page, orderBy]);

  const [showPermissionUserModal, setShowPermissionUserModal] = useState(false);
  const [showPermissionRoleModal, setShowPermissionRoleModal] = useState(false);
  const [PermissionId, setPermissionId] = useState('');

  const fetchData = async (search = '', exactMatch = false) => {
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
    selectableRows: 'none',
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

    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
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
      `/permissions`,
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

  const getSinglePermission = (id) => {
    setSinglePermission(data.filter((sale) => sale.id === id)[0]);
    setShowSinglePermissionModal(true);
  };

  const PermissionUsers = (id) => {
    setPermissionId(id);
    setShowPermissionUserModal(true);
  };
  const permissionRoles = (id) => {
    setPermissionId(id);
    setShowPermissionRoleModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='permission.permissionList' />}
        total={total}
        data={data}
        columns={tableColumns(
          getSinglePermission,
          PermissionUsers,
          permissionRoles,
        )}
        options={options}
        isLoading={loading}
        onEnterSearch={onEnterSearch}
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
      />

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='permission.permissionDownload' />}
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
          exportTitle={<IntlMessages id='permission.permissionList' />}
        />
      )}
      {/*end of for exporting data */}

      {showSinglePermissionModal && (
        <SinglePermissionModal
          open={showSinglePermissionModal}
          toggleOpen={() => setShowSinglePermissionModal((d) => !d)}
          singlePermission={singlePermission}
          width={500}
        />
      )}

      {showPermissionUserModal && (
        <PermissionUsersModal
          open={showPermissionUserModal}
          toggleOpen={() => setShowPermissionUserModal((d) => !d)}
          id={PermissionId}
        />
      )}

      {showPermissionRoleModal && (
        <PermissionRolesModal
          open={showPermissionRoleModal}
          toggleOpen={() => setShowPermissionRoleModal((d) => !d)}
          id={PermissionId}
        />
      )}
    </>
  );
}
