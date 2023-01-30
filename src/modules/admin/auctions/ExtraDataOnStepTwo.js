import {Autocomplete, Box, Button, Stack, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IntlMessages from '@crema/utility/IntlMessages';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const ExtraDataOnStepTwo = (props) => {
  const {messages} = useIntl();
  const onInputChange = (event, value, reason) => {
    if (reason == 'input') {
      const object = searchObject(value);
      props.searchVehicles(object);
    }
  };
  const searchObject = (value) => {
    const object = {};
    object.content = value;
    return object;
  };

  return (
    <Box>
      <Stack direction='row' spacing={5}>
        <Box sx={{flex: 1}}>
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{width: '100%'}}
            size='small'
            value={props.vehicle}
            onChange={(event, newValue) => {
              props.setVehicle(newValue);
            }}
            loading={props.vehiclesLoading}
            options={props.vehicles}
            getOptionLabel={(option) =>
              option.lot_number ? option.lot_number + ' - ' + option.vin : ''
            }
            renderOption={(props, option) => (
              <Box
                component='li'
                sx={{'& > img': {mr: 2, flexShrink: 0}}}
                {...props}
              >
                {option?.images?.length > 0 && (
                  <img
                    loading='lazy'
                    width='30'
                    src={option?.images[0]?.path}
                    alt=''
                  />
                )}
                {option.lot_number} - {option.vin}
              </Box>
            )}
            onInputChange={onInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={<IntlMessages id='common.vehicle' />}
                placeholder={messages['common.vehiclePlaceholder']}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {props.vehiclesLoading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          {props.vehiclesValidationError && (
            <Typography sx={{mx: 2}} component='p' variant='p' color='error'>
              <IntlMessages id='validation.vehiclesRequired' />
            </Typography>
          )}
        </Box>
        <Button
          sx={{
            minWidth: 100,
            alignSelf: 'self-start',
          }}
          color='primary'
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => {
            if (!props.vehicle?.id) {
              props.setVehiclesValidationError(true);
            } else {
              let index = props.values.items.findIndex(
                (item) => item.id == props.vehicle.id,
              );
              if (index == -1) {
                props.setAuctionItem({});
                props.setAuctionItemModal(true);
              }
            }
          }}
        >
          <IntlMessages id='common.add' />
        </Button>
      </Stack>
      <Typography component='p' sx={{fontWeight: 'bold', px: 1, my: 3}}>
        <IntlMessages id='vehicle.totalVehicles' />: {props.values.items.length}
      </Typography>
    </Box>
  );
};

export default ExtraDataOnStepTwo;
ExtraDataOnStepTwo.propTypes = {
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
  setAuctionItemModal: PropTypes.func,
};
