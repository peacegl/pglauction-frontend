import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';
import jwtAxios, {setAuthToken} from './index';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({children}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    permissions: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          permissions: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/auth')
        .then(({data}) => {
          const permissions = data.permissions;
          delete data.permissions;
          setJWTAuthData({
            user: data,
            permissions: permissions,
            isLoading: false,
            isAuthenticated: true,
          });
        })
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            permissions: null,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
    };

    getAuthUser();
  }, []);

  const signInUser = async ({email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post('login', {email, password});
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      const permissions = res?.data?.permissions;
      delete res?.data?.permissions;
      setJWTAuthData({
        user: res.data,
        permissions: permissions,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const signUpUser = async ({name, email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post('users', {name, email, password});
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      const permissions = res?.data?.permissions;
      delete res?.data?.permissions;
      setJWTAuthData({
        user: res.data,
        permissions: permissions,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    const response = await jwtAxios.post('logout');
    if (response.status == 200) {
      localStorage.removeItem('token');
      setAuthToken();
      setJWTAuthData({
        user: null,
        permissions: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
