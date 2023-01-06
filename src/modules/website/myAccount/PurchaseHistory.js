import {filterContent, tableColumns} from 'configs/webpages/purchaseList';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {onGetMyPurchaseList} from 'redux/actions';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box} from '@mui/material';

const PurchaseHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({webVehicles}) => webVehicles.myPurchaseList,
  );
  const {loading} = useSelector(({common}) => common);
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetMyPurchaseList({
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
    onSearchChange: (value) => {
      setSearch(value);
    },
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
  };
  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  return (
    <Box sx={{mt: 8}}>
      <CustomDataTable
        title={<IntlMessages id='common.myPurchaselist' />}
        total={total}
        data={data}
        columns={tableColumns(router)}
        options={options}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='purchaselist.deleteMessage' />}
        isLoading={loading}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={false}
        showEditButton={false}
        showDeleteButton={false}
        selectableRows={false}
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title={<IntlMessages id='purchaseList.filterPurchaseList' />}
          content={filterContent}
        />
      )}
    </Box>
  );
};

export default PurchaseHistory;
