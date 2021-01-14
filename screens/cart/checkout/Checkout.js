import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from './../../../shared/form/FormContainer';
import Input from './../../../shared/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
const countries = require('./../../../assets/data/countries.json');
//shipping
const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState(0);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };
    props.navigation.navigate('Payment', { order: order });
  };
  useEffect(() => {
    setOrderItems(props.cartItems);
    return () => {
      setOrderItems();
    };
  }, []);
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title='Shipping Address'>
        <Input
          placeholder={'Phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeType={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Address1'}
          value={address}
          onChangeType={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Address2'}
          value={address2}
          onChangeType={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          value={city}
          onChangeType={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeType={(text) => setZip(text)}
        />
        <Item picker>
          <Picker
            mode='dropdown'
            iosIcon={<Icon name='arrow-down' color={'#007aff'} />}
            style={{ width: undefined }}
            selectedValue={country}
            placeholder='Select your Country'
            placeholderIconColor='#007aff'
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => (
              <Picker.Item key={c.code} label={c.name} value={c.value} />
            ))}
          </Picker>
        </Item>
        <Item>
          <View stlye={{ width: '80%', alignItems: 'center' }}>
            <Button title='Confirm' onPress={() => checkOut()} />
          </View>
        </Item>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
