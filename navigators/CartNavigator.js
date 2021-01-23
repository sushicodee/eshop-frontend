import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../screens/cart/Cart';
import CheckoutNavigator from './CheckoutNavigator';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Cart'
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutNavigator}
        options={{ title: 'Checkout ' }}
      />
    </Stack.Navigator>
  );
}
const CartNavigator = () => {
  return <MyStack />;
};

export default CartNavigator;
