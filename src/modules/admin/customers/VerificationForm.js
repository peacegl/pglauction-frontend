import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, IconButton, MenuItem, Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {BsFillFilePdfFill} from 'react-icons/bs';
import AppTooltip from '@crema/core/AppTooltip';
import {Visibility} from '@mui/icons-material';

const VerificationForm = (props) => {
  const {messages} = useIntl();

  function handleDownload(dataUrl, filename) {
    let link = document.createElement('a');
    link.download = filename;
    link.target = '_blank';

    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    link = null;
  }

  return (
    <Box sx={{mt: 10}}>
      <Stack spacing={{xs: 5, md: 8}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box sx={{display: 'flex', px: 2}}>
            <Typography>
              <IntlMessages id='common.account_type' />:
            </Typography>
            <Typography
              sx={{
                textTransform: 'capitalize',
                mx: 3,
                fontWeight: 'bold',
              }}
            >
              {props.customerData?.is_business == 0
                ? messages['customer.business_account']
                : messages['customer.individual_account']}
            </Typography>
          </Box>
          {props.customerData?.company && (
            <Box sx={{display: 'flex', px: 2}}>
              <Typography>
                <IntlMessages id='common.company' />:
              </Typography>
              <Typography sx={{mx: 3, fontWeight: 'bold'}}>
                {props.customerData?.company}
              </Typography>
            </Box>
          )}
          {props.customerData?.identification_proof && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <BsFillFilePdfFill style={{fontSize: '30px'}} />
              <Box
                sx={{
                  mx: 1,
                  py: 2,
                  display: 'flex',

                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <AppTooltip
                    title={
                      props.customerData?.identification_proof_name
                        ? props.customerData?.identification_proof_name
                        : 'Identification Proof'
                    }
                  >
                    <Typography noWrap>
                      {props.customerData?.identification_proof_name
                        ? props.customerData?.identification_proof_name
                        : 'Identification Proof'}
                    </Typography>
                  </AppTooltip>
                </Box>
                {props.customerData?.identification_proof_size && (
                  <Box>
                    {Math.ceil(
                      props.customerData?.identification_proof_size / 1024,
                    )}
                    KB
                  </Box>
                )}
                <Box sx={{marginLeft: 'auto'}}>
                  {props.customerData?.identification_proof && (
                    <IconButton
                      onClick={(e) => {
                        handleDownload(
                          props.customerData?.identification_proof,
                          props.customerData?.identification_proof,
                        );
                      }}
                      size='small'
                    >
                      <Visibility fontSize='inherit' />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            placeholder={messages['common.statusPlaceholder']}
            label={<IntlMessages id='common.status' />}
            name='customer_status'
            variant='outlined'
            size='small'
            value={props.values?.customer_status}
            sx={{flex: 1}}
          >
            {props.customerData?.identification_proof && (
              <MenuItem value='verified'>Verified</MenuItem>
            )}
            <MenuItem value='unverified'>Unverified</MenuItem>
            <MenuItem value='pending verification'>
              Pending Verification
            </MenuItem>
          </AppTextField>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VerificationForm;
VerificationForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  customerData: PropTypes.any,
};
