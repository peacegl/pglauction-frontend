import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import SignInModal from 'modules/auth/Signin/SignInModal';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import IntlMessages from '@crema/utility/IntlMessages';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {moneyFormater, getData} from 'configs';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Form, Formik} from 'formik';
import Item from 'components/Item';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import * as yup from 'yup';
import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  InputAdornment,
  Typography,
} from '@mui/material';

const BidInfo = ({vehicle, id}) => {
  const {messages} = useIntl();
  const {user} = useAuthUser();
  const [bidStatus, setBidStatus] = useState(3);
  const [currentBid, setCurrentBid] = useState(0);
  const [showSignInModal, setShowSignInModl] = useState(false);
  const [bidStatusLoading, setBidStatusLoading] = useState(true);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    amount: yup
      .number()
      .typeError(<IntlMessages id='validation.amountError' />)
      .min(
        currentBid > 0 ? currentBid + 500 : vehicle.minimum_bid,
        currentBid > 0
          ? `${messages['validation.biggerThanCurrentBid']} ${moneyFormater(
              currentBid,
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
    setCurrentBid(vehicle.bids[0]?.amount ? vehicle.bids[0]?.amount : 0);
  }, []);

  const handleSubmit = async (values, actions) => {
    if (user?.email) {
      sendRequest(values);
    } else {
      setShowSignInModl(true);
    }
  };

  const sendRequest = async (data) => {
    try {
      const res = await jwtAxios.post(`/add_bid/${id}`, data);
      if (res.status === 201 && res.data.result) {
        setCurrentBid(res.data.currentBid);
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

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
                <Chip
                  sx={{
                    px: 2,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    color: (theme) => theme.palette.primary.contrastText,
                    bgcolor: '#ffa834',
                    '&:hover': {
                      backgroundColor: '#c98709',
                    },
                  }}
                  label={moneyFormater(vehicle?.buy_now_price)}
                  size='small'
                  onClick={() => buyNow()}
                />
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
  id: PropTypes.any,
};
