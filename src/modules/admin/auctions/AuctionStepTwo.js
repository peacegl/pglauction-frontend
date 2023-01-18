import CircularProgress from '@mui/material/CircularProgress';
import {Box, Button, Chip, Stack, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {useState} from 'react';

const AuctionStepTwo = (props) => {
  const {messages} = useIntl();
  const [vehicle, setVehicle] = useState('');

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
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction='row' spacing={5} alignItems='center'>
          <Autocomplete
            sx={{flex: 1}}
            size='small'
            value={vehicle}
            onChange={(event, newValue) => {
              setVehicle(newValue);
            }}
            loading={props.vehiclesLoading}
            options={props.vehicles}
            getOptionLabel={(option) =>
              option.lot_number ? option.lot_number + ' - ' + option.vin : ''
            }
            renderOption={(props, option) => (
              <Box component='li' {...props}>
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
          <Button
            sx={{
              minWidth: 100,
            }}
            color='primary'
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => {
              let index = props.values.items.findIndex(
                (item) => item.id == vehicle.id,
              );
              if (index == -1) {
                props.setfieldvalue('items', [vehicle, ...props.values.items]);
              }
              setVehicle('');
            }}
          >
            <IntlMessages id='common.add' />
          </Button>
        </Stack>
        <Typography component='p' sx={{fontWeight: 'bold'}}>
          <IntlMessages id='vehicle.totalVehicles' />:{' '}
          {props.values.items.length}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {props.values.items?.map((item, index) => (
            <Chip
              sx={{m: 1.5}}
              key={index}
              label={`${item.lot_number} - ${item.vin}`}
              variant='outlined'
              onDelete={() =>
                props.setfieldvalue(
                  'items',
                  props.values.items.filter((veh) => veh.id != item.id),
                )
              }
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default AuctionStepTwo;
AuctionStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  searchVehicles: PropTypes.func,
  vehiclesLoading: PropTypes.bool,
  vehicles: PropTypes.array,
};
