import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import SignupFirebase from './SignupFirebase';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';

const Signup = () => {
  return (
    <AuthWrapper>
      <SignupFirebase />
    </AuthWrapper>
  );
};

export default Signup;
