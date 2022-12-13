import {ADD_USER, DELETE_USER, EDIT_USER} from 'shared/constants/Permissions';
import CustomDataTable from '../../../components/CustomDataTable';
import {tableColumns} from '../../../configs/pages/users';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import UserModal from './UserModal';
import PropTypes from 'prop-types';
import {
  onGetUserList,
  onDeleteUsers,
  getUserAutocompleteOptions,
} from 'redux/actions';

export default function UserList({user}) {
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
      handleFilter(filterList);
    },
    onFilterChange: (column, filterList, type) => {
      if (type === 'chip') {
        handleFilter(filterList);
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

  const handleFilter = (filterList) => {
    const filterData = {};
    filterData['login.username'] = filterList[2][0]
      ? 'like@@' + filterList[2][0].trim()
      : undefined;
    filterData['users.firstname'] = filterList[3][0]
      ? 'like@@' + filterList[3][0].trim()
      : undefined;
    filterData['users.lastname'] = filterList[4][0]
      ? 'like@@' + filterList[4][0].trim()
      : undefined;
    filterData['users.gender'] = filterList[7][0]
      ? 'exact@@' + filterList[7][0].toLowerCase()
      : undefined;
    filterData['login.status'] = filterList[9][0]
      ? 'exact@@' + filterList[9][0].toLowerCase()
      : undefined;
    filterData['login.type'] = filterList[10][0]
      ? 'exact@@' + filterList[10][0].toLowerCase()
      : undefined;
    filterData['users.created_by'] = filterList[13].map((item) => item.id);
    filterData['users.updated_by'] = filterList[15].map((item) => item.id);
    filterData['users.created_at'] = {
      from: filterList[14][0],
      to: filterList[14][1],
    };
    filterData['users.updated_at'] = {
      from: filterList[16][0],
      to: filterList[16][1],
    };
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
        showAddButton={user?.permissions?.includes(ADD_USER)}
        showEditButton={user?.permissions?.includes(EDIT_USER)}
        showDeleteButton={user?.permissions?.includes(DELETE_USER)}
        selectableRows={
          user?.permissions?.includes(EDIT_USER) ||
          user?.permissions?.includes(DELETE_USER)
        }
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
UserList.propTypes = {
  user: PropTypes.any,
};
