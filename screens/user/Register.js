import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import FormContainer from '../../shared/form/FormContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorView from '../../shared/ErrorView';
import Input from '../../shared/form/Input';
import axiosApi from './../../axiosApi/index';
import Toast from 'react-native-toast-message';
import StyledButton from '../../shared/styledComponents/StyledButton';
const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleconfirmPassword = (text) => {
    if (text !== password) {
      setError('passwords do not match');
    } else {
      setError('');
    }
    setConfirmPassword(text);
  };

  const handleRegister = () => {
    if (!password || !email || !phone || !name) {
      return setError('Please fill all the form fields');
    } else {
      setError('');
    }
    const user = {
      name,
      email,
      password,
      phone,
      isAdmin: false,
    };

    axiosApi
      .post('user/register', user)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Successfull',
            text2: 'Please login to continue',
          });
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 2000);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please Try again',
        });
      });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title='Register'>
        <Input
          id={'name'}
          placeholder={'name'}
          name={'name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          id={'email'}
          placeholder={'email'}
          name={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase().trim())}
        />
        <Input
          id={'phone'}
          placeholder={'phone'}
          name={'phone'}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          id={'password'}
          placeholder={'password'}
          name={'password'}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {/* <Input
          id={'confirmPassword'}
          placeholder={'confirmPassword'}
          name={'confirmPassword'}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={(text) => handleconfirmPassword(text)}
        /> */}

        <View style={styles.buttonGroup}>
          {error !== '' && <ErrorView message={error} />}
        </View>
        <StyledButton large secondary onPress={() => handleRegister()}>
          <Text style={{ color: 'white' }}>Register</Text>
        </StyledButton>
        <View style={styles.buttonGroup}>
          <StyledButton onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: 'white' }}>Back to login</Text>
          </StyledButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
});
export default Register;
