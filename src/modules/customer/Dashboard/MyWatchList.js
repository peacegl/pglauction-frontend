import {filterContent, tableColumns} from 'configs/webpages/watchList';
import {onDeleteMyWatchList, onGetMyWatchList} from 'redux/actions';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Container} from '@mui/material';

const WatchList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({webVehicles}) => webVehicles.myWatchList,
  );
  const {loading} = useSelector(({common}) => common);
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetMyWatchList({
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
    tableBodyHeight: 'auto',
    count: total,
    rowsPerPage: per_page,
    page: page,
    download: false,
    print: false,
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
  const onDelete = async () => {
    await dispatch(
      onDeleteMyWatchList({
        vehicle_ids: selected.map((item) => data[item].id),
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
    <Container maxWidth='xl'>
      <Box sx={{mt: 8}}>
        <CustomDataTable
          title={<IntlMessages id='common.myWatchlist' />}
          total={total}
          data={data}
          columns={tableColumns(router)}
          options={options}
          onDelete={onDelete}
          onFilterClick={() => setOpenFilter(true)}
          deleteTitle={<IntlMessages id='watchlist.deleteMessage' />}
          isLoading={loading}
          selected={selected}
          onEnterSearch={onEnterSearch}
          onExactChange={(value) => setExactMatch(value)}
          showAddButton={false}
          showEditButton={false}
          showDeleteButton={true}
          selectableRows={true}
          exportData={data}
        />
        {openFilter && (
          <FilterModal
            open={openFilter}
            toggleOpen={() => setOpenFilter((d) => !d)}
            initialData={filterData}
            updateFilterData={setFilterData}
            title={<IntlMessages id='watchList.filterWatchList' />}
            content={filterContent}
          />
        )}
      </Box>
    </Container>
  );
};

export default WatchList;
