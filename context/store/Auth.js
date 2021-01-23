import React, { useReducer, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import AuthReducer from './../reducers/AuthReducer';
import { setCurrentUser, SET_CURRENT_USER } from './../actions/AuthActions';
import AuthGlobal from './AuthGlobal';

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    const token = AsyncStorage.getItem('x-access-token').then((token) => {
      if (token) {
        const decoded = token ? jwt_decode(token) : '';
        if (decoded) {
          dispatch(setCurrentUser(decoded));
        }
      }
    });
    return () => {
      setShowChild(false);
    };
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
