import {
  onGetCustomerList,
  onDeleteCustomers,
  getUserAutocompleteOptions,
} from 'redux/actions';
import {filterContent, tableColumns} from '../../../configs/pages/customers';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../../components/CustomDataTable';
import CustomerModal from './CustomerModal';
import {useEffect, useState} from 'react';
import FilterModal from 'components/CustomModal/FilterModal';

export default function CustomerList() {
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
  const {data = [], total = 0} = useSelector(
    ({customers}) => customers.customerData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetCustomerList({
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
      onDeleteCustomers({
        customerIds: selected.map((item) => data[item].id),
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
    filterData['customers.firstname'] = filterList[3][0]
      ? 'like@@' + filterList[3][0].trim()
      : undefined;
    filterData['customers.lastname'] = filterList[4][0]
      ? 'like@@' + filterList[4][0].trim()
      : undefined;
    filterData['customers.gender'] = filterList[7][0]
      ? 'exact@@' + filterList[7][0].toLowerCase()
      : undefined;
    filterData['login.status'] = filterList[9][0]
      ? 'exact@@' + filterList[9][0].toLowerCase()
      : undefined;
    filterData['login.type'] = filterList[10][0]
      ? 'exact@@' + filterList[10][0].toLowerCase()
      : undefined;
    filterData['customers.created_by'] = filterList[11].map((item) => item.id);
    filterData['customers.updated_by'] = filterList[13].map((item) => item.id);
    filterData['customers.created_at'] = {
      from: filterList[12][0],
      to: filterList[12][1],
    };
    filterData['customers.updated_at'] = {
      from: filterList[14][0],
      to: filterList[14][1],
    };
    setFilterData(filterData);
  };

  return (
    <>
      <CustomDataTable
        title='Customer List'
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
        onExactChange={(value) => setExactMatch(value)}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          onApply={(filterData) => {
            setFilterData(filterData);
            setOpenFilter(false);
          }}
          title='Customers Filter'
          content={filterContent}
        />
      )}
      {openModal && (
        <CustomerModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
