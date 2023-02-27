import {onGetAuctionItems, onGetSingleAuctionData} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import ItemHeader from 'components/design/ItemHeader';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import Error404 from 'modules/errorPages/Error404';
import {Box, Typography} from '@mui/material';
import AuctionDetail from './AuctionDetail';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AppLoader} from '@crema';
import IntlMessages from '@crema/utility/IntlMessages';
import {tableColumns} from 'configs/pages/auctionItems';

const AuctionDetails = () => {
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {auction = {}} = useSelector(({auctions}) => auctions);
  const {loading} = useSelector(({common}) => common);
  const [exactMatch, setExactMatch] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [per_page, setPerPage] = useState(20);
  const router = useRouter();
  const {id} = router.query;
  const {user} = useAuthUser();
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({auctions}) => auctions.auctionItemsData,
  );

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    fetchItems(search);
  }, [dispatch, page, per_page, orderBy]);

  const fetchData = async () => {
    await dispatch(onGetSingleAuctionData(id));
  };

  const fetchItems = async (search = '') => {
    await dispatch(
      onGetAuctionItems(id, {
        page: page + 1,
        per_page,
        search,
        exactMatch,
        orderBy,
      }),
    );
  };

  const options = {
    count: total,
    rowsPerPage: per_page,
    onViewColumnsChange: (changedColumn, action) => {
      onViewColumnsChange(
        changedColumn,
        action,
        setDownloadColumns,
        downloadColumns,
        tableColumns(),
      );
    },
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
      onDeleteLocations({
        locationIds: selected.map((item) => data[item].id),
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
      {loading ? (
        <AppLoader />
      ) : auction?.id ? (
        <>
          <ItemHeader
            onBack={() => {
              router.back();
            }}
            title={
              <Typography
                component='h1'
                fontSize='25px'
                fontWeight='bold'
                overflow='hidden'
              >
                {auction.name}
              </Typography>
            }
          />
          <Box sx={{display: 'flex'}}>
            <Box sx={{flex: 0.3}}>
              <AuctionDetail auction={auction} />
            </Box>
          </Box>
          <CustomDataTable
            title={<IntlMessages id='vehicle.vehicleList' />}
            total={total}
            data={data}
            columns={tableColumns()}
            options={options}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            onFilterClick={() => setOpenFilter(true)}
            deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
            isLoading={loading}
            selected={selected}
            onEnterSearch={onEnterSearch}
            onExactChange={(value) => setExactMatch(value)}
            // showAddButton={user?.permissions?.includes(ADD_VEHICLE)}
            // showEditButton={user?.permissions?.includes(EDIT_VEHICLE)}
            // showDeleteButton={user?.permissions?.includes(DELETE_VEHICLE)}
            // selectableRows={
            //   user?.permissions?.includes(EDIT_VEHICLE) ||
            //   user?.permissions?.includes(DELETE_VEHICLE) ||
            //   user?.permissions?.includes(ADD_SALE)
            //     ? 'multiple'
            //     : 'none'
            // }
            // onDownloadClick={() => {
            //   setOpenDownload(true);
            // }}
          />
        </>
      ) : (
        !loading && !auction?.id && <Error404 url='/' />
      )}
    </>
  );
};

export default AuctionDetails;
