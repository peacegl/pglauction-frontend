import React from 'react';
import Box from '@mui/material/Box';
import SignInStyle from './SignInStyle';
import {Stack} from '@mui/material';

const Signin = () => {
  return (
    // <Box
    //   sx={{
    //     flex: 1,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    <Stack
      direction={{xs: 'column', md: 'row'}}
      justifyContent='center'
      alignItems='center'
      spacing={7}
    >
      <SignInStyle />
      <Box>
        <img
          loading='lazy'
          width='100%'
          src={`https://www.copart.com/content/nightcap-748x339.jpg`}
          alt=''
        />
      </Box>
      {/* </Box> */}
    </Stack>
  );
};

export default Signin;
