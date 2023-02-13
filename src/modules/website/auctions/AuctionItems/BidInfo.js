import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {moneyFormater, getData} from 'configs';
import {useEffect, useState} from 'react';
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

const BidInfo = ({vehicle}) => {
  const {messages} = useIntl();
  const [bidValue, setBidValue] = useState('');
  const [bidError, setBidError] = useState(false);
  const [bidStatus, setBidStatus] = useState(3);
  const [bidStatusLoading, setBidStatusLoading] = useState(true);
  const validationSchema = yup.object({
    amount: yup
      .number()
      .typeError(<IntlMessages id='validation.amountError' />)
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

  const buyNow = () => {
    //code here buy now price
    console.log(vehicle);
  };

  const bidChange = (e) => {
    setBidValue(e.target.value);
    if (parseFloat(e.target.value) < vehicle?.minimum_bid) {
      setBidError(true);
    } else {
      setBidError(false);
    }
  };

  const bid = () => {
    if (parseFloat(bidValue) < vehicle?.minimum_bid || bidValue == '') {
      setBidError(true);
    } else {
      // code here for bid
      console.log('bid');
    }
  };

  return (
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
            value={moneyFormater(
              vehicle.bids[0]?.amount ? vehicle.bids[0]?.amount : 0,
            )}
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
  );
};

export default BidInfo;
BidInfo.propTypes = {
  vehicle: PropTypes.any,
};
