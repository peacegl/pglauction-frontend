import React from 'react';
import {Container} from '@mui/material';
import AuthWrapper from '../AuthWrapper';
import SignupFirebase from './SignupFirebase';

const Signup = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 6}}>
      <AuthWrapper>
        <SignupFirebase />
      </AuthWrapper>
    </Container>
  );
};

export default Signup;
