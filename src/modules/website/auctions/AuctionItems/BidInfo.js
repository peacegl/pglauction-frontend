import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import Item from 'components/vehicles/VehicleDetails/Item';
import SignInModal from 'modules/auth/Signin/SignInModal';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {moneyFormater, getData} from 'configs';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import WebEcho from 'plugins/echoWeb';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import * as yup from 'yup';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  InputAdornment,
  Typography,
} from '@mui/material';

const BidInfo = ({id, vehicle, setVehicle}) => {
  const {messages} = useIntl();
  const {user} = useAuthUser();
  const [bidStatus, setBidStatus] = useState(3);
  const [currentBid, setCurrentBid] = useState(0);
  const [showSignInModal, setShowSignInModl] = useState(false);
  const [bidStatusLoading, setBidStatusLoading] = useState(true);
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
  }, []);

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
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  useEffect(() => {
    WebEcho();
    window.Echo.channel(`web.bid`).listen('Web', (e) => {
      console.log(e);
      if (e.action == 'created') {
        setVehicle((d) => {
          return {...d, bids: [e.data, ...d.bids]};
        });
      }
    });
    return () => {
      const echoChannel = window.Echo.channel(`web.bid`);
      echoChannel.stopListening('Web');
      Echo.leave(`web.bid`);
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
            <Formik
              validateOnChange={true}
              initialValues={{
                amount: '',
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
                    <AppTextField
                      placeholder={messages['common.amountPlaceholder']}
                      label={<IntlMessages id='common.amount' />}
                      name='amount'
                      variant='outlined'
                      size='small'
                      sx={{width: '100%', mt: 8}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <IntlMessages id='common.AED' />
                          </InputAdornment>
                        ),
                      }}
                    />
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
        </CardContent>
      </Card>
      {showSignInModal && (
        <SignInModal
          open={showSignInModal}
          toggleopen={() => setShowSignInModl((d) => !d)}
          width={500}
        />
      )}
    </>
  );
};

export default BidInfo;
BidInfo.propTypes = {
  vehicle: PropTypes.any,
  setVehicle: PropTypes.func,
  id: PropTypes.any,
};
