import CustomStepper from 'components/CustomModal/CustomStepper';
import IntlMessages from '@crema/utility/IntlMessages';
import SaveIcon from '@mui/icons-material/Save';
import {Box, Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';

const SignupStepperModal = ({
  steps,
  onSave,
  validationSchema,
  initialValues,
  customValidation,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleSubmit = async (values, actions) => {
    if (customValidation) {
      const isValid = await customValidation(values, actions, activeStep + 1);
      if (!isValid) return;
    }
    if (activeStep == steps?.length - 1) {
      await onSave(values);
    } else {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === steps?.length - 1
          ? prevActiveStep
          : prevActiveStep + 1,
      );
      actions.setTouched({});
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep == 0 ? 0 : prevActiveStep - 1,
    );
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <Formik
      validateOnChange={true}
      initialValues={initialValues}
      validationSchema={
        Array.isArray(validationSchema)
          ? validationSchema[activeStep]
          : validationSchema
      }
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
            {steps && (
              <>
                <Box
                  sx={{
                    py: 3,
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <CustomStepper
                    steps={steps}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    customValidation={customValidation}
                    values={values}
                    actions={actions}
                    validationSchema={validationSchema}
                  />
                </Box>
              </>
            )}
            {steps && (
              <Box>
                <Box
                  sx={{
                    px: 3,
                    py: 5,
                  }}
                >
                  {React.cloneElement(steps[activeStep]?.children, {
                    values: values,
                    setfieldvalue: actions.setFieldValue,
                  })}
                </Box>
              </Box>
            )}
            <Box square sx={{display: 'flex', flexDirection: 'row', p: 2}}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{mr: 1}}
              >
                <IntlMessages id='common.back' />
              </Button>
              <Box sx={{flex: '1 1 auto'}} />

              {activeStep < steps?.length - 1 && (
                <LoadingButton
                  variant='contained'
                  sx={{px: 6, mx: 3}}
                  type='submit'
                  loading={actions.isSubmitting}
                >
                  <IntlMessages id='common.next' />
                </LoadingButton>
              )}
              {activeStep === steps?.length - 1 && (
                <LoadingButton
                  loading={actions.isSubmitting}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  type='submit'
                >
                  <IntlMessages id='common.save' />
                </LoadingButton>
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupStepperModal;
SignupStepperModal.propTypes = {
  steps: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  validationSchema: PropTypes.any,
  initialValues: PropTypes.object,
  customValidation: PropTypes.func,
};
