import {Box, Modal} from '@mui/material';
import SignInStyle from './SignInStyle';
import PropTypes from 'prop-types';

export default function SignInModal({open, toggleopen}) {
  return (
    <Modal open={open} toggleOpen={toggleopen}>
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SignInStyle showClose toggleOpen={toggleopen} />
      </Box>
    </Modal>
  );
}
SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleopen: PropTypes.func,
};
