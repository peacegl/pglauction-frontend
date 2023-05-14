import {ADD_USER, DELETE_USER, EDIT_USER} from 'shared/constants/Permissions';
import DownloadModal from 'components/CustomModal/downloadModal';
import {filterContent, tableColumns} from 'configs/pages/users';
import FilterModal from 'components/CustomModal/FilterModal';
import {onGetUserList, onDeleteUsers} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import {useEffect, useState} from 'react';
import UserModal from './UserModal';
import SingleUserModal from './SingleUserModal';
import PropTypes from 'prop-types';

export default function UserList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);

  const [filterData, setFilterData] = useState({});
  const [singleUser, setSingleUser] = useState([]);
  const [showSingleUserModal, setShowSingleUserModal] = useState(false);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({users}) => users.userList);
  const {loading} = useSelector(({common}) => common);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '', exactMatch = false) => {
    await dispatch(
      onGetUserList({
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
      onDeleteUsers({
        userIds: selected.map((item) => data[item].id),
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
      `/users`,
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

  const getSingleUser = (id) => {
    setSingleUser(data.filter((sale) => sale.id === id)[0]);
    setShowSingleUserModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='user.userList' />}
        total={total}
        data={data}
        columns={tableColumns(getSingleUser)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        showAddButton={user?.permissions?.includes(ADD_USER)}
        showEditButton={user?.permissions?.includes(EDIT_USER)}
        showDeleteButton={user?.permissions?.includes(DELETE_USER)}
        selectableRows={
          user?.permissions?.includes(EDIT_USER) ||
          user?.permissions?.includes(DELETE_USER)
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
          title={<IntlMessages id='user.userDownload' />}
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
          exportTitle={<IntlMessages id='user.userList' />}
        />
      )}
      {/*end of for exporting data */}

      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title='Users Filter'
          content={filterContent}
        />
      )}
      {openModal && (
        <UserModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
      {showSingleUserModal && (
        <SingleUserModal
          open={showSingleUserModal}
          toggleOpen={() => setShowSingleUserModal((d) => !d)}
          singleUser={singleUser}
          width={450}
        />
      )}
    </>
  );
}
UserList.propTypes = {
  user: PropTypes.any,
};
