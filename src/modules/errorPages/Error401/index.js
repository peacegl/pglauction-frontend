import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {grey} from '@mui/material/colors';
import {Fonts} from 'shared/constants/AppEnums';
import {userInitialUrl} from 'shared/constants/AppConst';
import AppAnimate from '@crema/core/AppAnimate';
import IntlMessages from '@crema/utility/IntlMessages';
import Logo from '../../../assets/icon/401.svg';
import {useTheme} from '@mui/material';
import {useRouter} from 'next/router';
import AppPageMeta from '../../../@crema/core/AppPageMeta';

const Error401 = () => {
  const theme = useTheme();
  const history = useRouter();

  const onGoBackToHome = () => {
    history.push(userInitialUrl);
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AppPageMeta />
      <Box
        sx={{
          py: {xl: 8},
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            mb: {xs: 4, xl: 8},
            width: '100%',
            maxWidth: {xs: 200, sm: 300, xl: 706},
            '& svg': {
              width: '100%',
              maxWidth: 400,
            },
          }}
        >
          <Logo fill={theme.palette.primary.main} />
        </Box>
        <Box sx={{mb: {xs: 4, xl: 5}}}>
          <Box
            variant='h3'
            sx={{
              mb: {xs: 3, xl: 4},
              fontSize: {xs: 20, md: 24},
              fontWeight: Fonts.MEDIUM,
            }}
          >
            Unauthorized
          </Box>
          <Box
            sx={{
              mb: {xs: 4, xl: 5},
              color: grey[600],
              fontSize: 16,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Typography>You are not authorized for this page</Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 16,
              textTransform: 'capitalize',
            }}
            onClick={onGoBackToHome}
          >
            <IntlMessages id='error.goBackToHome' />
          </Button>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Error401;
