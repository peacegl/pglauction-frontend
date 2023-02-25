import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {tableColumns} from 'configs/pages/auctions';
import AuctionModal from './AuctionModal';
import {useEffect, useState} from 'react';
import EchoConfig from 'plugins/echo';
import PropTypes from 'prop-types';
import {
  onGetAuctionData,
  onDeleteAuctions,
  addRealTimeAuction,
  addRealTimeAuctionCount,
  updateRealTimeAuction,
} from 'redux/actions';
import {
  ADD_AUCTION,
  DELETE_AUCTION,
  EDIT_AUCTION,
} from 'shared/constants/Permissions';
import {useRouter} from 'next/router';
import AuctionVehicleModal from './AuctionVehiclesModal';

export default function AuctionList({user}) {
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
  const router = useRouter();
  const [showAuctionVehiclesModal, setShowAuctionVehiclesModal] =
    useState(false);

  const [auctionId, setAuctionId] = useState('');

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

  useEffect(() => {
    EchoConfig();
    window.Echo.private(`update.auction`).listen('Updated', (e) => {
      if (user.uid != e.authUser) {
        if (e.action === 'created') {
          console.log('', e.data);
          newAuctionRealTime(e.data);
        }
        if (e.action == 'updated') {
          updateAuctionRealTime(e.data);
        }
        if (e.action == 'deleted') {
          fetchData();
        }
      }
    });
    return () => {
      const echoChannel = window.Echo.private(`update.auction`);
      echoChannel.stopListening('Updated');
      Echo.leave(`update.auction`);
    };
  }, []);

  const newAuctionRealTime = async (data) => {
    if (page == 0) {
      await dispatch(addRealTimeAuction(data));
    } else {
      await dispatch(addRealTimeAuctionCount(data));
    }
  };

  const updateAuctionRealTime = async (data) => {
    await dispatch(updateRealTimeAuction(data));
  };

  const showAuctionVehicles = (id) => {
    console.log(id);
    setAuctionId(id);
    setShowAuctionVehiclesModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='auction.auctionList' />}
        total={total}
        data={data}
        columns={tableColumns(router, showAuctionVehicles)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='auction.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={user?.permissions?.includes(ADD_AUCTION)}
        showEditButton={user?.permissions?.includes(EDIT_AUCTION)}
        showDeleteButton={user?.permissions?.includes(DELETE_AUCTION)}
        selectableRows={
          user?.permissions?.includes(EDIT_AUCTION) ||
          user?.permissions?.includes(DELETE_AUCTION)
            ? 'multiple'
            : 'none'
        }
        exportData={data}
      />
      {openModal && (
        <AuctionModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
      {showAuctionVehiclesModal && (
        <AuctionVehicleModal
          open={showAuctionVehiclesModal}
          toggleOpen={() => setShowAuctionVehiclesModal((d) => !d)}
          auctionId={auctionId}
        />
      )}
    </>
  );
}
AuctionList.propTypes = {
  user: PropTypes.any,
};
