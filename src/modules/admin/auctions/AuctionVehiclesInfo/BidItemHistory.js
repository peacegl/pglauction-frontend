import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAuctionItemBid} from 'redux/actions';
import {Box} from '@mui/system';
import {
  Avatar,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
import TableHeading from 'components/CustomTableHeading/TableHeading';
import {moneyFormater} from 'configs';
import IntlMessages from '@crema/utility/IntlMessages';
import {grey} from '@mui/material/colors';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {
  FETCH_ERROR,
  GET_AUCTION_ITEM_BID_IS_ACCEPTED,
} from 'shared/constants/ActionTypes';
import {appIntl} from '@crema/utility/helper/Utils';
import SingleCustomerModal from './SingleCustomerModal';
import WebEcho from 'plugins/echoWeb';
import {useRouter} from 'next/router';
// import EchoConfig from 'plugins/echo';
// import {useAuthUser} from '@crema/utility/AuthHooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const BidItemHistory = ({id}) => {
  const {messages} = appIntl();
  const router = useRouter();

  const color = grey[100];
  const dispatch = useDispatch();
  const _scrollBarRef = useRef();
  const {data = [], hasMore} = useSelector(
    ({auctions}) => auctions.auctionItemBid,
  );
  const acceptedIdState = useSelector(
    ({auctions}) => auctions.auctionsAcceptedID,
  );
  const [page, setPage] = useState(2);
  const [fetch, setFetch] = useState(false);
  const [acceptedId, setAcceptedId] = useState(acceptedIdState ?? '');
  const [showSingleCustomerModal, setShowSingleCustomerModal] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState([]);

  const fetchData = async (id) => {
    setFetch(true);
    await dispatch(
      onGetAuctionItemBid(id, {
        per_page: 10,
        page: page,
        orderBy: {column: 'created_at', order: 'desc'},
      }),
    );
    setFetch(false);
  };

  const onScroll = () => {
    if (_scrollBarRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = _scrollBarRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (!fetch && hasMore) {
          setPage(page + 1);
          fetchData(id);
        }
      }
    }
  };

  // useEffect(() => {}, [acceptedId]);

  const is_accepted = () => {
    const find = data.find((item) => item.is_accepted == true);
    if (find == undefined) {
      return {
        item_id: null,
        is_accepted: false,
      };
    } else {
      dispatch({
        type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
        payload: find.id,
      });
      return {
        item_id: find.id,
        is_accepted: true,
      };
    }
  };

  const disabled = (id) => {
    if (is_accepted().is_accepted || acceptedId) {
      if (is_accepted().item_id == id || acceptedId == id) {
        return false;
      } else return true;
    } else {
      return false;
    }
  };

  const AcceptClick = async (item_id) => {
    try {
      const res = await jwtAxios.post(`/bid/${item_id}`, null, {
        params: {
          auction_id: id,
        },
      });

      if (res.status === 200 && res.data.data) {
        if (acceptedId != '' && acceptedId) {
          setAcceptedId('');
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: '',
          });
        } else {
          setAcceptedId(item_id);
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: item_id,
          });
        }
      }
    } catch (e) {
      dispatch({type: FETCH_ERROR, payload: e.message});
    }
  };

  const header = [
    {id: 'common.customer'},
    {id: 'bid.bid_amount'},
    {id: 'common.status'},
    {id: 'common.created_at'},
    {id: 'common.actions', align: 'center'},
  ];

  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState('');

  const handleAccept = async () => {
    await AcceptClick(itemId);
    setOpen(false);
  };

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.bid`).listen('Web', (e) => {
      if (e.action == 'bidAccepted') {
        disabled(e.data[0]);
        setAcceptedId(e.data[0]);
        if (e.data[0] == router.query.id) {
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: e.data[0],
          });
        }
      }
      if (e.action == 'bidCanceled') {
        setAcceptedId('');
        if (e.data[0] == router.query.id) {
          dispatch({
            type: GET_AUCTION_ITEM_BID_IS_ACCEPTED,
            payload: '',
          });
        }
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.bid`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.bid`);
    };
  }, []);

  return (
    <div
      onScroll={onScroll}
      ref={_scrollBarRef}
      style={{height: '600px', overflow: 'auto', width: '100%'}}
    >
      <Table stickyHeader className='table' sx={{pb: 7, height: `100%`}}>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading header={header} />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {data.map((item, index) => {
            return (
              <TableRow
                key={index}
                sx={{
                  '& .tableCell': {
                    fontSize: 13,
                    padding: 2,
                    whiteSpace: 'nowrap',
                    '&:first-of-type': {
                      pl: 2,
                    },
                    '&:last-of-type': {
                      pr: 2,
                    },
                  },
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: color,
                  },
                }}
                className='item-hover'
                onClick={() => {
                  setSingleCustomer(item.buyer);
                  setShowSingleCustomerModal(true);
                }}
              >
                <TableCell component='th' scope='row' className='tableCell'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 3.5,
                      }}
                    >
                      A
                    </Avatar>
                    <Box
                      sx={{
                        fontWeight: Fonts.MEDIUM,
                      }}
                    >
                      {item?.buyer.username}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {moneyFormater(item.amount)}
                </TableCell>
                <TableCell align='left' className='tableCell' sx={{p: 1}}>
                  {item.is_accepted == 0 ? 'No' : 'yes'}
                </TableCell>
                <TableCell align='left' className='tableCell'>
                  {item.created_at}
                </TableCell>
                <TableCell align='center' sx={{p: 1}}>
                  <Button
                    sx={{
                      borderRadius: 0.7,
                      width: '100%',
                      textTransform: 'capitalize',
                      marginTop: 'auto',
                      height: 25,
                      px: 2,
                    }}
                    disabled={disabled(item.id)}
                    variant='contained'
                    color='primary'
                    onClick={async (e) => {
                      e.stopPropagation();
                      // disabled(item.id);
                      setItemId(item.id);
                      setOpen(true);
                    }}
                  >
                    <IntlMessages
                      id={
                        is_accepted().item_id == item.id ||
                        acceptedId == item.id
                          ? 'common.cancel'
                          : 'common.accept'
                      }
                    />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {showSingleCustomerModal && (
        <SingleCustomerModal
          open={showSingleCustomerModal}
          toggleOpen={() => setShowSingleCustomerModal((d) => !d)}
          singleCustomer={singleCustomer}
          width={450}
        />
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        sx={{textAlign: 'center'}}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle sx={{fontSize: '24px'}}>
          {<IntlMessages id='common.areYouSure' />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {acceptedId == '' || acceptedId == null ? (
              <IntlMessages id='common.acceptDialogText' />
            ) : (
              <IntlMessages id='common.cancelDialogText' />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            <IntlMessages id='common.close' />
          </Button>
          <Button onClick={handleAccept}>
            {acceptedId == '' || acceptedId == null ? 'accept' : 'cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BidItemHistory;

BidItemHistory.propTypes = {
  id: PropTypes.any,
};
