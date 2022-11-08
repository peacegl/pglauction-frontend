import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CustomStepper from './CustomStepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {useState, useLayoutEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
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
      actions.setSubmitting(true);
      await onSave(values);
      actions.setSubmitting(false);
      // actions.resetForm();
    } else {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === steps?.length - 1
          ? prevActiveStep
          : prevActiveStep + 1,
      );
      actions.setTouched({});
      actions.setSubmitting(false);
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
        <IconButton
          aria-label='close'
          onClick={toggleOpen}
          sx={{float: 'right'}}
        >
          <CloseIcon sx={{fontSize: 18}} />
        </IconButton>
        {steps && (
          <Paper variant='outlined' square sx={{py: 3}}>
            <CustomStepper steps={steps} activeStep={activeStep} />
          </Paper>
        )}
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={
            Array.isArray(validationSchema)
              ? validationSchema[activeStep]
              : validationSchema
          }
          onSubmit={handleSubmit}
        >
          {({values, setFieldValue, isSubmitting, setFieldError, ...rest}) => {
            return (
              <Form>
                <Box>
                  {steps && (
                    <Box
                      sx={{
                        height: 450,
                        overflowY: 'auto',
                      }}
                    >
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
                      <Box sx={{mx: 3, my: 5}}>
                        {React.cloneElement(steps[activeStep]?.children, {
                          values: values,
                          setfieldvalue: setFieldValue,
                          setFieldError: setFieldError,
                        })}
                      </Box>
                    </Box>
                  )}
                  {children && (
                    <>
                      <Box
                        sx={{
                          height: 500,
                          overflowY: 'auto',
                        }}
                      >
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
                            {title ?? title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            mx: 3,
                            my: 5,
                          }}
                        >
                          {React.cloneElement(children, {
                            values: values,
                            setfieldvalue: setFieldValue,
                          })}
                        </Box>
                      </Box>
                    </>
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
                      <Button
                        variant='contained'
                        sx={{px: 6, mx: 3}}
                        type='submit'
                      >
                        <IntlMessages id='common.next' />
                      </Button>
                    )}
                    {(activeStep === steps?.length - 1 || children) && (
                      <LoadingButton
                        loading={isSubmitting}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant='contained'
                        type='submit'
                      >
                        <IntlMessages id='common.save' />
                      </LoadingButton>
                    )}
                  </Paper>
                </Box>
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
  validationSchema: PropTypes.array,
  initialValues: PropTypes.object,
  customValidation: PropTypes.func,
  isLoading: PropTypes.bool,
  setValues: PropTypes.func,
};
