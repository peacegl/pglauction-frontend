import {useEffect, useState} from 'react';
import {
  onGetAuctionData,
  onDeleteAuctions,
  getUserAutocompleteOptions,
} from 'redux/actions';
import CustomDataTable from '../../CustomDataTable';
import {useDispatch, useSelector} from 'react-redux';
import AuctionModal from './AuctionModal';
import IntlMessages from '@crema/utility/IntlMessages';
import {tableColumns} from 'configs/pages/auctions';

export default function AuctionList() {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [recordId, setRecordId] = useState(null);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionsList,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetAuctionData({
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
    page: page,
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
  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteAuctions({
        auctionIds: selected.map((item) => data[item].id),
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
    filterData['auction_items.status'] = filterList[9][0]
      ? 'exact@@' + filterList[9][0].toLowerCase()
      : undefined;
    filterData['seller.username'] = filterList[10][0]
      ? 'like@@' + filterList[10][0].trim()
      : undefined;
    filterData['auction_items.created_by'] = filterList[11].map(
      (item) => item.id,
    );
    filterData['auction_items.updated_by'] = filterList[13].map(
      (item) => item.id,
    );
    filterData['auction_items.created_at'] = {
      from: filterList[12][0],
      to: filterList[12][1],
    };
    filterData['auction_items.updated_at'] = {
      from: filterList[14][0],
      to: filterList[14][1],
    };
    setFilterData(filterData);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='auction.auctionList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='auction.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        hideAddButton
      />
      {openModal && (
        <AuctionModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
