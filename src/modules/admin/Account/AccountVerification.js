import SingleFileDropzone from 'components/dropzone/SingleFileDropzone';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import IntlMessages from '@crema/utility/IntlMessages';
import {BsPatchExclamationFill} from 'react-icons/bs';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {onUpdateAuthUser} from 'redux/actions';
import {GoUnverified} from 'react-icons/go';
import {MdVerified} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Button} from '@mui/material';
import Helper from 'helpers/helpers';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

const AccountVerification = ({
  initialValues,
  setValues,
  identificationProof,
  setIdentificationProof,
}) => {
  const {updateAuthUser} = useAuthMethod();
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {user} = useAuthUser();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values) => {
    let newvalues = values;
    setValues((d) => {
      return {...d, ...newvalues};
    });
    const userFormData = Helper.getFormData(values);
    await dispatch(
      onUpdateAuthUser(
        `/account_verification`,
        userFormData,
        false,
        user,
        updateAuthUser,
      ),
    );
  };

  return (
    <Formik
      validateOnBlur={false}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await delay(0);
        await handleSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({values, setFieldValue, isSubmitting, setFieldError, ...rest}) => {
        return (
          <Form>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: {xs: 3, lg: 4},
              }}
            >
              <Typography
                component='h3'
                sx={{
                  fontSize: 16,
                  fontWeight: Fonts.BOLD,
                }}
              >
                <IntlMessages id='common.accountInfo' />
              </Typography>
              <Chip
                label={values?.customer_status}
                color={
                  values?.customer_status == 'verified'
                    ? 'success'
                    : values?.customer_status == 'pending verification'
                    ? 'primary'
                    : 'default'
                }
                variant='outlined'
                sx={{textTransform: 'capitalize'}}
                icon={
                  values?.customer_status == 'verified' ? (
                    <MdVerified style={{fontSize: '18px'}} />
                  ) : values?.customer_status == 'pending verification' ? (
                    <BsPatchExclamationFill style={{fontSize: '18px'}} />
                  ) : (
                    <GoUnverified style={{fontSize: '18px'}} />
                  )
                }
              />
            </Box>
            {values?.customer_status == 'verified' ? (
              <Stack spacing={{xs: 5, md: 8}}>
                <Typography
                  component='h3'
                  sx={{
                    fontSize: 16,
                  }}
                >
                  <IntlMessages id='common.verifiedMessage' />
                </Typography>
              </Stack>
            ) : values?.customer_status == 'pending verification' ? (
              <Stack spacing={{xs: 5, md: 8}}>
                <Typography
                  component='h3'
                  sx={{
                    fontSize: 16,
                  }}
                >
                  <IntlMessages id='common.pendingVerificationMessage' />
                </Typography>
              </Stack>
            ) : (
              <>
                <Box>
                  <Stack spacing={{xs: 5, md: 8}}>
                    <Stack
                      direction={{xs: 'column', md: 'row'}}
                      spacing={5}
                      sx={{mx: 'auto'}}
                    >
                      <FormControl sx={{flex: 1}}>
                        <FormLabel id='demo-row-radio-buttons-group-label'>
                          <IntlMessages id='customer.business_type' />
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby='demo-row-radio-buttons-group-label'
                          name='row-radio-buttons-group'
                          value={values?.is_business}
                          onChange={(e) =>
                            setFieldValue('is_business', e.target.value)
                          }
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label={<IntlMessages id='common.business' />}
                          />
                          <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label={<IntlMessages id='common.individual' />}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={{xs: 'column', md: 'row'}}
                      spacing={5}
                      alignItems='center'
                    >
                      <Box sx={{flex: 1}}>
                        <SingleFileDropzone
                          text={
                            <>
                              <IntlMessages id='common.identificationProof' />
                              <Box sx={{textAlign: 'center'}}>
                                {values?.is_business == 1 && (
                                  <>
                                    (
                                    <IntlMessages id='customer.companyLicense' />
                                    )
                                  </>
                                )}
                                {values?.is_business == 0 && (
                                  <>
                                    (<IntlMessages id='customer.passport_id' />)
                                  </>
                                )}
                              </Box>
                            </>
                          }
                          width={250}
                          height={'auto'}
                          image={identificationProof}
                          name='identification_proof'
                          setfieldvalue={setFieldValue}
                          setImage={setIdentificationProof}
                          isImageValid={true}
                        />
                      </Box>
                      <Box sx={{flex: 1}}>
                        {values?.is_business == 1 && (
                          <AppTextField
                            placeholder={messages['common.companyPlaceholder']}
                            label={<IntlMessages id='common.company' />}
                            name='company'
                            variant='outlined'
                            size='small'
                            sx={{width: '100%'}}
                          />
                        )}
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <LoadingButton
                    loading={isSubmitting}
                    loadingPosition='start'
                    startIcon={<SaveIcon />}
                    variant='contained'
                    type='submit'
                    sx={{
                      minWidth: 100,
                      mr: 2,
                      mt: 2,
                    }}
                  >
                    <IntlMessages id='common.saveChanges' />
                  </LoadingButton>
                  <Button
                    sx={{
                      minWidth: 100,
                      mt: 2,
                    }}
                    color='primary'
                    variant='outlined'
                    onClick={() => rest.setValues(initialValues)}
                  >
                    <IntlMessages id='common.cancel' />
                  </Button>
                </Box>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountVerification;
AccountVerification.propTypes = {
  initialValues: PropTypes.object,
  setValues: PropTypes.func,
  identificationProof: PropTypes.object,
  setIdentificationProof: PropTypes.func,
};
