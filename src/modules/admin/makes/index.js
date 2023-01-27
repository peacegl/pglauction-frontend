import CustomDataTable from '../../../components/CustomDataTable';
import {tableColumns} from '../../../configs/pages/makes';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import MakeModal from './MakeModal';
import {
  onGetMakeList,
  onDeleteMakes,
  getUserAutocompleteOptions,
} from 'redux/actions';

export default function MakeList() {
  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({makes}) => makes.makeData);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetMakeList({
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
      onDeleteMakes({
        makeIds: selected.map((item) => data[item].id),
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
    filterData['makes.name'] = filterList[0][0]
      ? 'like@@' + filterList[0][0].trim()
      : undefined;
    filterData['makes.created_by'] = filterList[1].map((item) => item.id);
    filterData['makes.updated_by'] = filterList[3].map((item) => item.id);
    filterData['makes.created_at'] = {
      from: filterList[2][0],
      to: filterList[2][1],
    };
    filterData['makes.updated_at'] = {
      from: filterList[4][0],
      to: filterList[4][1],
    };
    setFilterData(filterData);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='make.makeList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='make.deleteMessage' />}
        isLoading={loading}
        onExactChange={(value) => setExactMatch(value)}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
      {openModal && (
        <MakeModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
          width={500}
        />
      )}
    </>
  );
}
