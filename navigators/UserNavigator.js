import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';
import UserProfile from '../screens/user/UserProfile';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='User Profile'
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
const UserNavigator = () => {
  return <MyStack />;
};

export default UserNavigator;
