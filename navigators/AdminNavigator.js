import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/admin/Products';
import Categories from '../screens/admin/Categories';
import Orders from '../screens/admin/Orders';
import ProductForm from '../screens/admin/ProductForm';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Product'
        component={Products}
        options={{ title: 'Products' }}
      />

      <Stack.Screen
        name='Categories'
        component={Categories}
        options={{ title: 'Categories' }}
      />
      <Stack.Screen
        name='Orders'
        component={Orders}
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name='ProductForm'
        component={ProductForm}
        options={{ title: 'Product Form' }}
      />
    </Stack.Navigator>
  );
}

function AdminNavigator() {
  return <MyStack />;
}

export default AdminNavigator;
