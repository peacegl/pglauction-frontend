import RolesConfigs from '../../../configs/pages/roles';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../../components/CustomDataTable';
import {onGetRoleList, onDeleteRoles} from 'redux/actions';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button} from '@mui/material';
import RoleModal from './RoleModal';
const columns = RolesConfigs().columns;

export default function UserList() {
  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({roles}) => roles.roleList);
  const filterData = useSelector(({roles}) => roles.filterData);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetRoleList({
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
      onDeleteRoles({
        roleIds: selected.map((item) => data[item].id),
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
        title={<IntlMessages id='role.roleList' />}
        total={total}
        data={data}
        columns={columns}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='role.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
      {openModal && (
        <RoleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
