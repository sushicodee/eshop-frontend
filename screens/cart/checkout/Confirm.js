import { View, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../redux/actions/cartActions';
import axiosApi from '../../../axiosApi';
import Toast from 'react-native-toast-message';
let { width } = Dimensions.get('window');
const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = async () => {
    const order = finalOrder.order.order;
    try {
      const res = await axiosApi.post('order', order, {}, true);
      if (res.status === 200 || res.status === 201) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'OrderCompleted',
          text2: '',
        });
        setTimeout(() => {
          props.clearCart();
          props.navigation.navigate('Cart');
        }, 3000);
      }
    } catch (err) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please tyy again',
      });
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Confirm Order</Text>
      </View>
      {props.route.params ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'blue',
          }}
        >
          <Text style={styles.title}>Shipping to {}</Text>
          <View style={{ padding: 0 }}>
            <Text>Address : {finalOrder.order.order.shippingAddress1}</Text>
            <Text>Address 2 : {finalOrder.order.order.shippingAddress2}</Text>
            <Text>City : {finalOrder.order.order.city}</Text>
            <Text>Zip Code : {finalOrder.order.order.zip}</Text>
            <Text>Country : {finalOrder.order.order.country}</Text>
          </View>
          <Text style={styles.title}></Text>
          {finalOrder.order.order.orderItems.map((x) => {
            return (
              <ListItem style={styles.listItem} key={x.product.name} avatar>
                <Left>
                  <Thumbnail source={{ uri: x.product.image }} />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{x.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>$ {x.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}
        </View>
      ) : null}

      <View style={{ alignItems: 'center', margin: 20 }}>
        <Button title={'Place Order'} onPress={() => confirmOrder()} />
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};
const styles = StyleSheet.create({
  container: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 0,
    fontWeight: 'bold',
  },
  listItem: {
    width: width / 1.2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
