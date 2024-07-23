import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import Item from 'components/design/Item';
import SignInModal from 'modules/auth/Signin/SignInModal';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {moneyFormater, getData} from 'configs';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HistoryIcon from '@mui/icons-material/History';

import * as yup from 'yup';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import BidHistories from './BidHistories';

const BidInfo = ({id, vehicle, setVehicle}) => {
  const {messages} = useIntl();
  const {user} = useAuthUser();
  const [bidStatus, setBidStatus] = useState(3);
  const [currentBid, setCurrentBid] = useState(0);
  const [showBid, setShowBid] = useState(true);

  const [showSignInModal, setShowSignInModl] = useState(false);
  const [bidStatusLoading, setBidStatusLoading] = useState(true);
  const [showHistories, setShowHistories] = useState(false);

  const dispatch = useDispatch();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const validationSchema = yup.object({
    amount: yup
      .number()
      .typeError(<IntlMessages id='validation.amountError' />)
      .min(
        currentBid > 0
          ? parseFloat(currentBid) + parseFloat(500)
          : vehicle.minimum_bid,
        currentBid > 0
          ? `${messages['validation.biggerThanCurrentBid']} ${moneyFormater(
              parseFloat(currentBid) + parseFloat(500),
            )}`
          : `${messages['validation.bidStartsAt']} ${moneyFormater(
              vehicle.minimum_bid,
            )}`,
      )
      .required(<IntlMessages id='validation.amountRequired' />),
  });

  useEffect(() => {
    getData(
      `/website/user_bid_status/${vehicle.id}`,
      {},
      setBidStatusLoading,
      setBidStatus,
    );
  }, [vehicle?.bids[0]?.amount]);

  useEffect(() => {
    setCurrentBid(vehicle?.bids[0]?.amount ? vehicle?.bids[0]?.amount : 0);
  }, [vehicle?.bids]);

  const handleSubmit = async (values, actions) => {
    if (user?.email) {
      sendRequest(values, actions);
    } else {
      setShowSignInModl(true);
    }
  };
  const sendRequest = async (data, actions) => {
    try {
      const res = await jwtAxios.post(`/website/add_bid/${id}`, data);
      if (res.status === 201 && res.data.result) {
        setVehicle((d) => {
          return {...d, bids: [res?.data?.data, ...d.bids]};
        });
        actions.resetForm();
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: error.message});
      }
    }
  };

  useEffect(() => {
    if (vehicle.status != 'active') {
      setShowBid(false);
    }
  }, []);

  useEffect(() => {
    window.echo.channel(`web.bid`).listen('Web', (e) => {
      if (e.action == 'created') {
        console.log('bid changed', e.data);
        setVehicle((d) => {
          return {
            ...d,
            buy_now_price: e.data.amount,
            bids: [e.data, ...d.bids],
          };
        });
      }
      if (e.action == 'bidAccepted') {
        if (e.data[0] == vehicle.id) {
          setShowBid(false);
          setVehicle((d) => {
            return {
              ...d,
              vehicle: {
                ...d.vehicle,
                status: 'sold',
              },
            };
          });
        }
      }
      if (e.action == 'bidCanceled') {
        if (e.data[0] == vehicle.id) {
          setShowBid(true);
          setVehicle((d) => {
            return {
              ...d,
              vehicle: {
                ...d.vehicle,
                status: 'available',
              },
            };
          });
        }
      }
    });
    return () => {
      const echoChannel = window.echo.channel(`web.bid`);
      echoChannel.stopListening('Web');
      window.echo.leave(`web.bid`);
    };
  }, []);

  return (
    <>
      <Card sx={{borderRadius: 1, boxShadow: 1, m: 0, minHeight: 400}}>
        <CardHeader
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
            color: 'white',
            p: 3,
          }}
          title={
            <Typography
              component='div'
              fontSize='16px'
              fontWeight='bold'
              overflow='hidden'
            >
              <IntlMessages id='auction.bidInfo' />
            </Typography>
          }
        />
        <CardContent
          sx={{
            py: 0,
          }}
        >
          {showBid ? (
            <Box>
              <Item
                label={<IntlMessages id='bid.bidStatus' />}
                value={
                  !bidStatusLoading ? (
                    bidStatus?.bid_status == 1 ? (
                      <IntlMessages id='bidStatus.topBidder' />
                    ) : bidStatus?.bid_status == 2 ? (
                      <IntlMessages id='bidStatus.notTopBidder' />
                    ) : (
                      bidStatus?.bid_status == 3 && (
                        <IntlMessages id='bidStatus.notBid' />
                      )
                    )
                  ) : (
                    <CircularProgress size={15} sx={{mx: 5}} />
                  )
                }
              />
              <Item
                label={<IntlMessages id='bid.minimum_bid' />}
                value={moneyFormater(vehicle?.minimum_bid)}
              />

              <Item
                label={<IntlMessages id='bid.currentBid' />}
                value={moneyFormater(currentBid)}
              />

              <Item
                label={<IntlMessages id='common.buy_now_price' />}
                value={
                  <Button
                    variant='contained'
                    color='success'
                    size='small'
                    href={`https://wa.me/${vehicle.vehicle?.seller?.loginable?.whatsapp}?text=${window.location.origin}/auctions/auction_items/${vehicle.id}`}
                    target='_blank'
                  >
                    {moneyFormater(vehicle?.buy_now_price)}
                  </Button>
                }
              />
              <Box sx={{padding:2}} >
                <Button 
                onClick={() => setShowHistories(true)}
                variant='contained' sx={{width:'100%', borderRadius:1}} endIcon={<HistoryIcon />}>
                  Bid History
                </Button>
              </Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  amount: currentBid > 0 ? currentBid : vehicle.minimum_bid,
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  await delay(0);
                  await handleSubmit(values, actions);
                  actions.setSubmitting(false);
                }}
              >
                {({values, ...actions}) => {
                  return (
                    <Form>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'start',
                          paddingTop: 5,
                        }}
                      >
                        <IconButton
                          sx={{
                            color: 'primary.main',
                          }}
                          onClick={() => {
                            const temp_amount =
                              values.amount - vehicle.minimum_bid;
                            if (temp_amount > 0) {
                              actions.setFieldValue('amount', temp_amount);
                            } else {
                              actions.setFieldValue(
                                'amount',
                                vehicle.minimum_bid,
                              );
                            }
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <AppTextField
                          placeholder={messages['common.amountPlaceholder']}
                          label={<IntlMessages id='common.amount' />}
                          name='amount'
                          variant='outlined'
                          size='small'
                          type='number'
                          sx={{width: '100%'}}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <IntlMessages id='common.AED' />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <IconButton
                          sx={{
                            color: 'primary.main',
                          }}
                          onClick={() => {
                            const temp_amount =
                              parseFloat(values.amount) +
                              parseFloat(vehicle.minimum_bid);
                            actions.setFieldValue('amount', temp_amount);
                          }}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <LoadingButton
                          loading={actions.isSubmitting}
                          variant='contained'
                          type='submit'
                          sx={{mt: 3, borderRadius: 1, minWidth: '100px'}}
                        >
                          <IntlMessages id='bid.bid' />
                        </LoadingButton>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
      {showSignInModal && (
        <SignInModal
          open={showSignInModal}
          toggleopen={() => setShowSignInModl((d) => !d)}
          width={500}
        />
      )}
      {
        showHistories && (
          <BidHistories
            auction_items_id={id}
            showHistories={showHistories}
            setShowHistories={setShowHistories}
          />
        )
      }
    </>
  );
};

export default BidInfo;
BidInfo.propTypes = {
  vehicle: PropTypes.any,
  setVehicle: PropTypes.func,
  id: PropTypes.any,
};
