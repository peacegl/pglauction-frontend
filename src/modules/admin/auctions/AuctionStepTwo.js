import {Box, Chip, Paper, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import AuctionItemModal from './AuctionItemModal';
import {moneyFormater} from 'configs';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

const AuctionStepTwo = (props) => {
  useEffect(() => {
    if (props.values?.items?.length) {
      props.setVehiclesValidationError(false);
    }
  }, [props.values?.items]);

  return (
    <Box sx={{position: 'relative'}}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.values.items?.map((item, index) => (
          <Paper sx={{m: 1, p: 1}} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <Chip
                  onClick={() => {
                    props.setAuctionItem(item);
                    props.setAuctionItemModal(true);
                  }}
                  sx={{m: 1.5}}
                  key={index}
                  label={`${item.lot_number} - ${item.vin}`}
                  variant='outlined'
                  onDelete={() => {
                    let items = props.values.items.filter(
                      (veh) => veh.id != item.id,
                    );
                    props.setfieldvalue('items', items);
                    props.setVehiclesValidationError(
                      items?.length == 0 ? true : false,
                    );
                  }}
                />
                <Typography sx={{textAlign: 'center'}}>
                  <IntlMessages id='vehicle.minimumBid' />:
                  <Typography component='span' sx={{fontWeight: 'bold', px: 1}}>
                    {moneyFormater(
                      parseInt(item.minimum_bid ? item.minimum_bid : 0),
                    )}
                  </Typography>
                </Typography>
                <Typography sx={{textAlign: 'center'}}>
                  <IntlMessages id='vehicle.buyNowPrice' />:
                  <Typography component='span' sx={{fontWeight: 'bold', px: 1}}>
                    {moneyFormater(
                      parseInt(item.buy_now_price ? item.buy_now_price : 0),
                    )}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      {props.auctionItemModal && (
        <AuctionItemModal
          open={props.auctionItemModal}
          toggleOpen={() => {
            props.setAuctionItemModal((d) => !d);
            props.setVehicle('');
          }}
          vehicle={props.vehicle}
          setfieldvalue={props.setfieldvalue}
          items={props.values?.items}
          auctionItem={props.auctionItem}
        />
      )}
    </Box>
  );
};

export default AuctionStepTwo;
AuctionStepTwo.propTypes = {
  values: PropTypes.any,
  setfieldvalue: PropTypes.func,
  searchVehicles: PropTypes.func,
  vehiclesLoading: PropTypes.bool,
  vehicles: PropTypes.array,
  vehiclesValidationError: PropTypes.bool,
  setVehiclesValidationError: PropTypes.func,
  setVehicle: PropTypes.func,
  vehicle: PropTypes.any,
  setAuctionItem: PropTypes.func,
  auctionItem: PropTypes.any,
  setAuctionItemModal: PropTypes.func,
  auctionItemModal: PropTypes.any,
};
