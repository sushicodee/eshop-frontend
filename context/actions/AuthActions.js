import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import axiosApi from '../../axiosApi';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  axiosApi
    .post('user/login', user)
    .then((data) => {
      if (data.token) {
        const { user, token } = data;
        AsyncStorage.setItem('x-access-token', token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: `logged in Successfully`,
        });
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please provide correct credentials ',
        text2: 'Something went wrong',
      });
      logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
  axiosApi
    .get('user', { params: id })
    .then((data) => {
      if (data) {
        const { user } = data;
      }
    })
    .catch((err) => {});
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem('x-access-token');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
