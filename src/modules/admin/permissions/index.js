import DownloadModal from 'components/CustomModal/downloadModal';
import PermissionsConfigs from 'configs/pages/permissions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {getData, onViewColumnsChange} from 'configs';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionList} from 'redux/actions';
import {useEffect, useState} from 'react';

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
    onViewColumnsChange: (changedColumn, action) => {
      onViewColumnsChange(
        changedColumn,
        action,
        setDownloadColumns,
        downloadColumns,
        columns,
      );
    },
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
    setDownloadColumns(columns);
  }, []);
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
        />
      )}
      {/*end of for exporting data */}
    </>
  );
}
