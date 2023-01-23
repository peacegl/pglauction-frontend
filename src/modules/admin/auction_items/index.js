import {onGetAuctionItemData, onDeleteAuctionItems} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import {tableColumns} from 'configs/pages/auctionItems';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import AuctionItemModal from './AuctionItemModal';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ADD_AUCTION_ITEM,
  DELETE_AUCTION_ITEM,
  EDIT_AUCTION_ITEM,
} from 'shared/constants/Permissions';

export default function AuctionItemList({user}) {
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
    ({auctionItems}) => auctionItems.auctionItemsList,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetAuctionItemData({
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
  };
  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteAuctionItems({
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

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='auction.auctionItemList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='auctionItem.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={user?.permissions?.includes(ADD_AUCTION_ITEM)}
        showEditButton={user?.permissions?.includes(EDIT_AUCTION_ITEM)}
        showDeleteButton={user?.permissions?.includes(DELETE_AUCTION_ITEM)}
        selectableRows={
          user?.permissions?.includes(EDIT_AUCTION_ITEM) ||
          user?.permissions?.includes(DELETE_AUCTION_ITEM)
            ? 'multiple'
            : 'none'
        }
      />
      {openModal && (
        <AuctionItemModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
    </>
  );
}
AuctionItemList.propTypes = {
  user: PropTypes.any,
};
