import React from 'react';
import Box from '@mui/material/Box';
import SignInStyle from './SignInStyle';

const Signin = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignInStyle />
    </Box>
  );
};

export default Signin;
