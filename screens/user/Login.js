import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ErrorView from '../../shared/ErrorView';
import FormContainer from './../../shared/form/FormContainer';
import Input from './../../shared/form/Input';
// context
import AuthGlobal from './../../context/store/AuthGlobal';
import { loginUser } from './../../context/actions/AuthActions';
import StyledButton from '../../shared/styledComponents/StyledButton';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  console.log(context.stateUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkLoggedIn = () => {
      if (context?.stateUser.isAuthenticated === true) {
        props.navigation.navigate('User Profile');
      }
    };
    checkLoggedIn();

    return () => {
      setEmail();
      setPassword();
      setError(false);
    };
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title='Login'>
      <Input
        id={'email'}
        placeholder={'email'}
        name={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase().trim())}
      />
      <Input
        id={'password'}
        placeholder={'password'}
        name={'password'}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error && <ErrorView message={error} />}
      </View>
      <View style={styles.buttonGroup}>
        <StyledButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: 'white' }}>Login</Text>
        </StyledButton>
      </View>
      <View style={[styles.buttonGroup, { marginTop: 40 }]}>
        <Text style={styles.middleText}>Don't have an account?</Text>
        <StyledButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Register</Text>
        </StyledButton>
      </View>
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;
