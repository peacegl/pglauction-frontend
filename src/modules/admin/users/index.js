import React from 'react';
import {Box} from '@mui/material';
import AppPageMeta from '../../../@crema/core/AppPageMeta';

const Page1 = () => {
  return (
    <>
      <AppPageMeta title='Users List' image='logo.png' />
      <Box sx={{my: 2}}>You can kick start your app</Box>
    </>
  );
};

export default Page1;
