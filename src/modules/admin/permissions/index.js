import PermissionsConfigs from 'configs/pages/permissions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionList} from 'redux/actions';
import {useEffect, useState} from 'react';
import {Button} from '@mui/material';

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
        title={<IntlMessages id='permission.permissionList' />}
        total={total}
        data={data}
        columns={columns}
        options={options}
        isLoading={loading}
        onEnterSearch={onEnterSearch}
      />
    </>
  );
}
