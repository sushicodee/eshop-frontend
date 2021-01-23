import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from 'native-base';
import StyledButton from '../styledComponents/StyledButton';
import TrafficLight from './../../shared/styledComponents/TraffiicLight';
const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [cardColor, setCardColor] = useState();

  const codes = [
    { name: 'pending', code: '3' },
    { name: 'shipped', code: '2' },
    { name: 'delivered', code: '1' },
  ];

  useEffect(() => {
    if (props.status === '3') {
      setOrderStatus(<TrafficLight unavaliable />);
      setStatusText('pending');
      setCardColor('#E74C3C');
    } else if (props.status === '2') {
      setOrderStatus(<TrafficLight limited />);
      setStatusText('Shipped');
      setCardColor('#F1C40F');
    } else if (props.status === '1') {
      setOrderStatus(<TrafficLight avaliavble />);
      setStatusText('Delivered');
      setCardColor('#2ECC71');
    }
    setStatusChange(props.status);
    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, [props.status]);

  const updateOrder = () => {
    const {
      country,
      city,
      dateOrdered,
      shippingAddress1,
      shippingAddress2,
      id,
      phone,
      user,
      zip,
    } = props;
    const order = {
      country,
      city,
      dateOrdered,
      shippingAddress1,
      shippingAddress2,
      id,
      phone,
      status: statusChange,
      total: props.totalPrice,
      user,
      zip,
    };
    props.handleUpdateOrder(order);
  };

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.title}>
        <Text>Order Number #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status {statusText} {orderStatus}
        </Text>
        <Text>Address: {props.shippingAddress1}</Text>
        <Text>Address: {props.shippingAddress2}</Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>phone: {props.phone}</Text>
        <Text>Date Ordered: {props.dateOrdered.split('T'[0])}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price:</Text>
          <Text style={styles.price}>${props.totalPrice}</Text>
        </View>
        {props.editMode && (
          <View>
            <Picker
              mode='dropdown'
              iosIcon={<Icon color={'#007aff'} name='arrow-down' />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder='Change Status'
              placeholderIconColor={{ color: '#007aff' }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => (
                <Picker.Item key={c.code} label={c.name} value={c.code} />
              ))}
            </Picker>
            <StyledButton
              secondary
              large
              onPress={() => props.editMode && updateOrder()}
            >
              <Text style={{ color: 'white' }}>Update</Text>
            </StyledButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    color: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    margin: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default OrderCard;
