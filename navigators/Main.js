import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import CartIcon from './../shared/CartIcon';
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='home' style={styles.icon} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ position: 'relative' }}>
              <Icon
                name='shopping-cart'
                style={styles.icon}
                color={color}
                size={30}
              />
              <CartIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Admin'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='cog' stlye={styles.icon} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='User'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='user' stlye={styles.icon} color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'relative',
  },
});

export default Main;
