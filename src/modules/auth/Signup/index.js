import React from 'react';
import AuthWrapper from '../AuthWrapper';
import SignupFirebase from './SignupFirebase';

const Signup = () => {
  return (
    <AuthWrapper>
      <SignupFirebase />
    </AuthWrapper>
  );
};

export default Signup;
