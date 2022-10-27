import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
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
  return (
    <Stepper
      activeStep={props.activeStep}
      alternativeLabel
      connector={<ColorlibConnector />}
      sx={{overflowX: 'auto'}}
    >
      {props.steps.map((step, index) => {
        return (
          <Step key={step.id}>
            <StepLabel
              StepIconComponent={() => (
                <Avatar
                  sx={{
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
        );
      })}
    </Stepper>
  );
}
CustomStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};
