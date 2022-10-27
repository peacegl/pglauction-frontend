import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CustomStepper from './CustomStepper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useState, useLayoutEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({open, toggleOpen, width, steps, children, ...rest}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [size, setSize] = useState([0]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === steps.length - 1 ? prevActiveStep : prevActiveStep + 1,
    );
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
          p: 4,
        }}
      >
        <IconButton
          aria-label='close'
          onClick={toggleOpen}
          sx={{float: 'right'}}
        >
          <CloseIcon />
        </IconButton>
        {steps && (
          <Box sx={{width: '100%'}}>
            <CustomStepper steps={steps} activeStep={activeStep} />
            <Box sx={{m: 4, minHeight: 500}}>{steps[activeStep].children}</Box>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{mr: 1}}
              >
                Back
              </Button>
              <Box sx={{flex: '1 1 auto'}} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
        {children && children}
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
};
