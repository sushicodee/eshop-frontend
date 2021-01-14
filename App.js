import React from 'react';
import Header from './shared/Header';
import { NavigationContainer } from '@react-navigation/native';
//Navigators
import Main from './navigators/Main';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
