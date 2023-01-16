import {useAuthMethod, useAuthUser} from '@crema/utility/AuthHooks';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import AuthWrapper from 'modules/auth/AuthWrapper';
import Error404 from 'modules/errorPages/Error404';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react';
import {Fonts} from 'shared/constants/AppEnums';
import {Skeleton} from '@mui/material';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const VerifyEmail = () => {
  const router = useRouter();
  const [pageState, setPageState] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const {updateAuthUser} = useAuthMethod();
  const {user} = useAuthUser();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (router.query?.token) {
      setPageState(1);
      try {
        const resp = await jwtAxios.get('/verify_email/' + router.query.token);
        if ((resp.status === 200, resp.data.result)) {
          setPageState(2);
          updateAuthUser({...user, email_verified_at: true});
          return;
        }
      } catch (err) {
        console.log(err);
      }
      setPageState(3);
    }
  }

  useEffect(() => {
    if (errorMessage != '') {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 4000);
      clearInterval(timeout);
    }
  }, [errorMessage]);

  return (
    <Box sx={{width: '100%', mt: 7}}>
      {pageState == 1 ? (
        <>
          <Box
            sx={{
              maxWidth: 900,
              minHeight: {xs: 320, sm: 450},
              width: '100%',
              margin: 'auto',
            }}
          >
            <Skeleton
              animation='wave'
              variant='rounded'
              width='100%'
              height='420px'
            />
          </Box>
        </>
      ) : pageState == 2 ? (
        <AuthWrapper>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 3,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: {xs: 16, xl: 20},
              textAlign: 'center',
            }}
          >
            <IntlMessages id='common.emailVerified' />
          </Typography>
        </AuthWrapper>
      ) : (
        <Error404 url='/' />
      )}
    </Box>
  );
};

export default VerifyEmail;

VerifyEmail.propTypes = {
  location: PropTypes.object,
};
