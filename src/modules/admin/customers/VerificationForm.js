import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, IconButton, MenuItem, Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {BsFillFilePdfFill} from 'react-icons/bs';
import AppTooltip from '@crema/core/AppTooltip';
import useDownloader from 'react-use-downloader';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const VerificationForm = (props) => {
  const {messages} = useIntl();
  const token = localStorage.getItem('token');
  const {size, elapsed, percentage, download, cancel, error, isInProgress} =
    useDownloader({
      mode: 'no-cors',
    });

  return (
    <Box sx={{mt: 10}}>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          spacing={5}
          justifyContent={{md: 'space-around'}}
          alignItems={{md: 'center'}}
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
            <Box sx={{position: 'relative'}}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BsFillFilePdfFill style={{fontSize: '30px'}} />
                <Box sx={{mx: 1, py: 2}}>
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
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    {props.customerData?.identification_proof && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          download(
                            props.customerData?.identification_proof,
                            props.customerData?.identification_proof_name,
                          );
                        }}
                        size='small'
                      >
                        <FileDownloadIcon fontSize='inherit' />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Stack>
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
