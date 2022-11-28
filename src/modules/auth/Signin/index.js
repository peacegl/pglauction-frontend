import {useEffect} from 'react';
import Box from '@mui/material/Box';
import SignInStyle from './SignInStyle';
import {Stack} from '@mui/material';
import Router, {useRouter} from 'next/router';
import {useAuthUser} from '@crema/utility/AuthHooks';
import AppLoader from '@crema/core/AppLoader';
import {
  userInitialUrl,
  customerInitialUrl,
} from '../../../shared/constants/AppConst';

const Signin = () => {
  const {user, isLoading} = useAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (user) {
      user.type == 'User'
        ? Router.push(userInitialUrl + (queryParams ? '?' + queryParams : ''))
        : Router.push(
            customerInitialUrl + (queryParams ? '?' + queryParams : ''),
          );
    }
  }, [user]);

  return (
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
    </Stack>
  );
};

export default Signin;
