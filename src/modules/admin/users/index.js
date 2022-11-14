import UserConfigs, {tableColumns} from '../../../configs/pages/users';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../CustomDataTable';
import {
  onGetUserList,
  onDeleteUsers,
  getUserAutocompleteOptions,
} from 'redux/actions';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button} from '@mui/material';
import UserModal from './UserModal';

export default function UserList() {
  const [openModal, setOpenModal] = useState(false);
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
    confirmFilters: true,
    onFilterDialogOpen: () => {
      dispatch(getUserAutocompleteOptions());
    },
    // callback that gets executed when filters are confirmed
    onFilterConfirm: (filterList) => {
      handleFilterSubmit(filterList);
    },
    onFilterChange: (column, filterList, type) => {
      if (type === 'chip') {
        handleFilterSubmit(filterList);
      }
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

  const handleFilterSubmit = (filterList) => {
    const filterData = {};
    filterData['login.username'] = filterList[2][0];
    filterData['firstname'] = filterList[3][0];
    filterData['lastname'] = filterList[4][0];
    filterData['login.status'] = filterList[9][0];
    filterData['type'] = filterList[10][0];
    filterData['created_by'] = filterList[13].map((item) => item.id);
    filterData['updated_by'] = filterList[15].map((item) => item.id);
    filterData['created_at'] = {from: filterList[14][0], to: filterList[14][1]};
    filterData['updated_at'] = {from: filterList[16][0], to: filterList[16][1]};
    setFilterData(filterData);
  };

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
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
      />
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
