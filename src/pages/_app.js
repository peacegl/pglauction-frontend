import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../@crema/utility/AppContextProvider';
import {Provider} from 'react-redux';
import AppThemeProvider from '../@crema/utility/AppThemeProvider';
import AppStyleProvider from '../@crema/utility/AppStyleProvider';
import AppLocaleProvider from '../@crema/utility/AppLocaleProvider';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import {useStore} from '../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.

import '../@crema/services/index';
import '../shared/vendors/index.css';
import AppPageMeta from '../@crema/core/AppPageMeta';
import JWTAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import EchoProvider from 'configs/EchoProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <EchoProvider>
      <CacheProvider value={emotionCache}>
        <AppContextProvider>
          <Provider store={store}>
            <AppThemeProvider>
              <AppStyleProvider>
                <AppLocaleProvider>
                  <JWTAuthProvider>
                    <AuthRoutes>
                      <CssBaseline />
                      <AppPageMeta />
                      <Component {...pageProps} />
                    </AuthRoutes>
                  </JWTAuthProvider>
                </AppLocaleProvider>
              </AppStyleProvider>
            </AppThemeProvider>
          </Provider>
        </AppContextProvider>
      </CacheProvider>
    </EchoProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
