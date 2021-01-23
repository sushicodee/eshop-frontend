import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from './../../../shared/form/FormContainer';
import Input from './../../../shared/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import AuthGlobal from '../../../context/store/AuthGlobal';
import Toast from 'react-native-toast-message';
const countries = require('./../../../assets/data/countries.json');
//shipping

const Checkout = (props) => {
  const {
    stateUser: { userProfile: user },
  } = useContext(AuthGlobal);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      zip,
      user,
    };
    let formErrors = {};
    for (let key in order) {
      if (order[key] === undefined) {
        formErrors[key] = true;
      }
    }
    if (Object.keys(formErrors).length !== 0) {
      return Toast.show({
        topOffsetMargin: 60,
        type: 'error',
        text1: 'Please fill in all the Details',
        text2: '',
      });
    }
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
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Address1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Address2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
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
              <Picker.Item key={c.code} label={c.name} value={c.name} />
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
