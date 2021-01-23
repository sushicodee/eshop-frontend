import React from 'react';
import Header from './shared/Header';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
//Navigators
import Main from './navigators/Main';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';

//context apis
import Auth from './context/store/Auth';
export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
