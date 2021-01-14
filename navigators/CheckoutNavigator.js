import React from 'react';
import Checkout from '../screens/cart/checkout/Checkout';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Payment from '../screens/cart/checkout/Payment';
import Confirm from '../screens/cart/checkout/Confirm';
const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Shipping' component={Checkout} />
      <Tab.Screen name='Payment' component={Payment} />
      <Tab.Screen name='Confirm' component={Confirm} />
    </Tab.Navigator>
  );
}
const CheckoutNavigator = () => {
  return <MyTabs />;
};

export default CheckoutNavigator;
