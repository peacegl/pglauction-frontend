import {ADD_USER, DELETE_USER, EDIT_USER} from 'shared/constants/Permissions';
import {filterContent, tableColumns} from 'configs/pages/users';
import FilterModal from 'components/CustomModal/FilterModal';
import {onGetUserList, onDeleteUsers, onGetAllUsers} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import UserModal from './UserModal';
import PropTypes from 'prop-types';
import DownloadModal from 'components/CustomModal/downloadModal';

export default function UserList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({users}) => users.userList);
  const {loading} = useSelector(({common}) => common);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
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
      onDeleteUsers({
        userIds: selected.map((item) => data[item].id),
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
  const usersTableRef = useRef();
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };

  let data3;
  const exportData = useSelector(({users}) => {
    data3 = users.usersExportData.data;
    if (
      isExportDataEmpty(users.usersExportData) ||
      exportDataAmount == 'current_page'
    ) {
      return [];
    } else {
      return users.usersExportData.data;
    }
  });

  const fetchExportAllData = async (filteredData = {}) => {
    await dispatch(
      onGetAllUsers({
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
        title={<IntlMessages id='user.userList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={user?.permissions?.includes(ADD_USER)}
        showEditButton={user?.permissions?.includes(EDIT_USER)}
        showDeleteButton={user?.permissions?.includes(DELETE_USER)}
        selectableRows={
          user?.permissions?.includes(EDIT_USER) ||
          user?.permissions?.includes(DELETE_USER)
        }
        // for exporting data
        ref={usersTableRef}
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
          title={<IntlMessages id='user.userDownload' />}
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
          tableRef={usersTableRef}
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
    </>
  );
}
UserList.propTypes = {
  user: PropTypes.any,
};
