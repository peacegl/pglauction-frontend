import React from 'react';
import {alpha, Box} from '@mui/material';
import PropTypes from 'prop-types';

const AccountTabsWrapper = ({children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        justifyContent: 'center',
        '& .account-tabs': {
          minWidth: {xs: 200, lg: 280},
          backgroundColor: (theme) => theme.palette.background.paper,
          backgroundImage: (theme) =>
            `linear-gradient(${alpha(
              theme.palette.common.white,
              0.05,
            )}, ${alpha(theme.palette.common.white, 0.05)})`,
          boxShadow: '0px 10px 10px 4px rgba(0, 0, 0, 0.04)',
          borderRadius: (theme) => theme.cardRadius / 4,
          py: 5,
          pr: 4,
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        },
        '& .account-tab': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: 36,
          maxWidth: 'none',
          py: 1,
          px: {xs: 4, lg: 6},
          fontSize: 14,
          color: (theme) => theme.palette.text.primary,
          borderRadius: '0 30px 30px 0',
          textTransform: 'capitalize',
          '&:not(:last-of-type)': {
            mb: 0.25,
          },
          '& svg': {
            fontSize: {xs: 16, md: 18, lg: 20},
            margin: '4px 16px 0 0',
            textTransform: 'capitalize',
          },
          '&:hover,&:focus,&.Mui-selected': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: (theme) => theme.palette.primary.main,
          },
        },
        '& .account-tabs-content': {
          maxWidth: '800px',
          backgroundColor: (theme) => theme.palette.background.paper,
          backgroundImage: (theme) =>
            `linear-gradient(${alpha(
              theme.palette.common.white,
              0.05,
            )}, ${alpha(theme.palette.common.white, 0.05)})`,
          boxShadow: '0px 10px 10px 4px rgba(0, 0, 0, 0.04)',
          borderRadius: (theme) => theme.cardRadius / 4,
          p: 5,
          flex: 1,
          ml: {sm: 5, lg: 8},
          mt: {xs: 5, sm: 0},
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AccountTabsWrapper;

AccountTabsWrapper.propTypes = {
  children: PropTypes.node,
};
