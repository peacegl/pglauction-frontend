import CategoryConfigs from '../../../configs/pages/categories';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../CustomDataTable';
import {onGetCategoryList, onDeleteCategories} from 'redux/actions';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import CategoryModal from './CategoryModal';

export default function userList() {
  const columns = CategoryConfigs().columns;

  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({categories}) => categories.categoryData,
  );
  const filterData = useSelector(({categories}) => categories.filterData);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetCategoryList({
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
      onDeleteCategories({
        categoryIds: selected.map((item) => data[item].id),
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

  return (
    <>
      <CustomDataTable
        title='Category List'
        total={total}
        data={data}
        columns={columns}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='confirm.category.delete' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
      />
      {openModal && (
        <CategoryModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
