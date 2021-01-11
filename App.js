import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductContainer from './screens/products/ProductContainer';
import Header from './shared/Header';

export default function App() {
  return (
    <View>
      <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
