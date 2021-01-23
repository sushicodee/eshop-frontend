import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ErrorView = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 14,
    color: 'red',
  },
});

export default ErrorView;
