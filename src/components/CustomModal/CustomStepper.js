import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));
export default function CustomStepper(props) {
  const handleActiveStep = async (index) => {
    for (let i = 0; i <= index; i++) {
      try {
        await props.validationSchema[i].validate(props.values);
      } catch (err) {
        props.setActiveStep(i);
        if (i == props.activeStep) {
          let validationErrors = await props.actions.validateForm();
          if (Object.keys(validationErrors).length > 0) {
            let errors = {};
            Object.keys(validationErrors).forEach((key) => {
              errors[key] = true;
            });
            if (Object.keys(errors).length) props.actions.setTouched(errors);
          }
        }
        return;
      }
      if (props.customValidation) {
        const isCustomValid = await props.customValidation(
          props.values,
          props.actions,
          props.activeStep + i + 1,
        );
        if (!isCustomValid) return;
      }
    }
    let validationErrors = await props.actions.validateForm();
    if (props.activeStep > index) {
      props.setActiveStep(index);
    } else if (Object.keys(validationErrors).length === 0) {
      props.setActiveStep(index);
    }
  };

  return (
    <Stepper
      activeStep={props.activeStep}
      alternativeLabel
      connector={<ColorlibConnector />}
      sx={{overflowX: 'auto'}}
    >
      {props.steps.map((step, index) => (
        <Step key={step.id}>
          <StepLabel
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => handleActiveStep(index)}
            StepIconComponent={() => (
              <Avatar
                sx={{
                  cursor: 'pointer',
                  bgcolor: (theme) => {
                    return props.activeStep >= index
                      ? theme.palette.primary.main
                      : theme.palette.grey['500'];
                  },
                }}
              >
                {step.icon}
              </Avatar>
            )}
          >
            <Box
              sx={{
                cursor: 'pointer',
                color: (theme) => {
                  return props.activeStep >= index
                    ? theme.palette.primary.main
                    : theme.palette.grey['500'];
                },
              }}
            >
              {step.label}
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
CustomStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  customValidation: PropTypes.func,
  actions: PropTypes.actions,
  values: PropTypes.values,
  validationSchema: PropTypes.array,
};
