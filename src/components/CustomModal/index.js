import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CustomStepper from './CustomStepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useState, useLayoutEffect} from 'react';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import IntlMessages from '@crema/utility/IntlMessages';
import AppLoader from '@crema/core/AppLoader';
import {Form, Formik} from 'formik';
import React from 'react';

const CustomModal = ({
  open,
  toggleOpen,
  width,
  steps,
  children,
  title,
  onSave,
  validationSchema,
  initialValues,
  customValidation,
  isLoading,
  height,
  ...rest
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [size, setSize] = useState([0]);
  const handleSubmit = async (values, actions) => {
    if (customValidation) {
      const isValid = await customValidation(values, actions, activeStep + 1);
      if (!isValid) return;
    }
    if (activeStep == steps?.length - 1 || children) {
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
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <Modal {...rest} open={open}>
      <Card
        sx={{
          mt: 16,
          mx: 'auto',
          width: width
            ? size >= width
              ? width
              : size - 10
            : size >= 900
            ? 900
            : size - 10,
          bgcolor: 'background.paper',
          boxShadow: 24,
          position: 'relative',
        }}
      >
        {isLoading && <AppLoader />}

        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          enableReinitialize
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
                    <IconButton
                      aria-label='close'
                      onClick={toggleOpen}
                      sx={{float: 'right'}}
                    >
                      <CloseIcon sx={{fontSize: 18}} />
                    </IconButton>

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
                        pt: 2,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant='h3'
                        sx={{
                          textAlign: 'center',
                          py: 3,
                          borderBottom: (theme) =>
                            `2px solid ${theme.palette.text.secondary}`,
                          borderRadius: '1px',
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        {steps[activeStep]?.label}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: height ? height : 380,
                        overflowY: 'auto',
                        px: 3,
                        py: 5,
                      }}
                    >
                      {React.cloneElement(steps[activeStep]?.children, {
                        values: values,
                        setfieldvalue: actions.setFieldValue,
                        setFieldError: actions.setFieldError,
                      })}
                    </Box>
                  </Box>
                )}
                {children && (
                  <Box>
                    <IconButton
                      aria-label='close'
                      onClick={toggleOpen}
                      sx={{float: 'right', display: 'flex'}}
                    >
                      <CloseIcon sx={{fontSize: 18}} />
                    </IconButton>
                    <Box sx={{clear: 'both'}}></Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant='h3'
                        sx={{
                          textAlign: 'center',
                          pb: 4,
                          mt: -5,
                          borderBottom: (theme) =>
                            `2px solid ${theme.palette.text.secondary}`,
                          borderRadius: '1px',
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        {title ?? title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: height ? height : 400,
                        overflowY: 'auto',
                        px: 3,
                        pt: 3,
                        my: 3,
                      }}
                    >
                      {React.cloneElement(children, {
                        values: values,
                        setfieldvalue: actions.setFieldValue,
                      })}
                    </Box>
                  </Box>
                )}
                <Paper
                  variant='outlined'
                  square
                  sx={{display: 'flex', flexDirection: 'row', p: 2}}
                >
                  {!children && (
                    <Button
                      color='inherit'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{mr: 1}}
                    >
                      <IntlMessages id='common.back' />
                    </Button>
                  )}
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
                  {(activeStep === steps?.length - 1 || children) && (
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
                </Paper>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  steps: PropTypes.array,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSave: PropTypes.func.isRequired,
  validationSchema: PropTypes.any,
  initialValues: PropTypes.object,
  customValidation: PropTypes.func,
  isLoading: PropTypes.bool,
  height: PropTypes.number || PropTypes.string,
};
