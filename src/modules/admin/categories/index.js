import CategoryConfigs from '../../../configs/pages/categories';
import {useDispatch, useSelector} from 'react-redux';
import CustomDataTable from '../../CustomDataTable';
import {onGetCategoryList, onDeleteCategories} from 'redux/actions';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';

export default function userList() {
  const columns = CategoryConfigs().columns;

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const {data = [], total = 0} = useSelector(
    ({categories}) => categories.categoryData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page]);

  const fetchData = async (search = '', filterData = {}) => {
    await dispatch(
      onGetCategoryList({
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
  };
  const onAdd = () => {};
  const onEdit = () => {};
  const onDelete = async () => {
    await dispatch(
      onDeleteCategories({
        categoryIds: selected.map((item) => data[item].id),
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
        deleteTitle={<IntlMessages id='category.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
    </>
  );
}
