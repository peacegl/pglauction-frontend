import UserConfigs from '../../../configs/pages/users';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../CustomDataTable';
import {onGetUserList, onDeleteUsers} from 'redux/actions';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Avatar} from '@mui/material';

export default function UserList() {
  const columns = UserConfigs().columns;

  columns[0]['options'].customBodyRender = (value, tableMeta, updateValue) => (
    <Avatar alt={' profile picture.'} src={value} />
  );

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const {data = [], total = 0} = useSelector(({users}) => users.userList);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page]);

  const fetchData = async (search = '', filterData = {}) => {
    await dispatch(
      onGetUserList({
        page: page + 1,
        per_page,
        search,
        filterData,
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
    confirmFilters: true,
    // Calling the applyNewFilters parameter applies the selected filters to the table
    customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
      return (
        <div style={{marginTop: '40px'}}>
          <Button
            variant='contained'
            onClick={() => handleFilterSubmit(applyNewFilters)}
          >
            Apply Filters
          </Button>
        </div>
      );
    },
    // callback that gets executed when filters are confirmed
    onFilterConfirm: (filterList) => {
      console.log('onFilterConfirm');
    },
    onFilterChange: (column, filterList, type) => {
      if (type === 'chip') {
        var newFilters = () => filterList;
        console.log('updating filters via chip');
        // handleFilterSubmit(newFilters);
      }
    },
  };
  const onAdd = () => {};
  const onEdit = () => {};
  const onDelete = async () => {
    await dispatch(
      onDeleteUsers({
        userIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
      }),
    );
    setSelected([]);
  };

  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  const handleFilterSubmit = (applyFilters) => {
    let filterList = applyFilters();
  };

  return (
    <>
      <CustomDataTable
        title='User List'
        total={total}
        data={data}
        columns={columns}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
    </>
  );
}
