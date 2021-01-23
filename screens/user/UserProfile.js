import React, { useContext, useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AuthGlobal from './../../context/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';
import axiosApi from '../../axiosApi';
import { logoutUser } from '../../context/actions/AuthActions';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/core';
import OrderCard from '../../shared/order/OrderCard';
const UserProfile = (props) => {
  const { stateUser, dispatch } = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState({});
  const [orders, setorders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderLoading, setisOrderLoading] = useState(true);
  const fetchUserProfile = async () => {
    if (!stateUser.isAuthenticated || stateUser.isAuthenticated === null) {
      return props.navigation.navigate('Login');
    }
    try {
      const data = await axiosApi.get(
        `user/${stateUser.user.userId}`,
        {},
        true
      );
      setUserProfile(data.user);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const fetchuserOrders = async () => {
    try {
      const data = await axiosApi.post(
        'order/search',
        { user: stateUser.user.userId },
        {},
        true
      );
      setorders(data.orderList.data);
      setisOrderLoading(false);
    } catch (err) {
      setisOrderLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchuserOrders();
      return () => {
        setUserProfile();
        setorders([]);
      };
    }, [stateUser.isAuthenticated])
  );
  return (
    <Container style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={30} color={'red'} />
      ) : (
        userProfile && (
          <ScrollView contentContainerStyle={styles.subContainer}>
            <Text style={{ fontSize: 30 }}>
              {userProfile.name ? userProfile.name : ''}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={{ margin: 10 }}>
                Email: {userProfile.email ? userProfile.email : ''}
              </Text>
              <Text style={{ margin: 10 }}>
                Phone: {userProfile.phone ? userProfile.phone : ''}
              </Text>
            </View>
            <View style={{ marginTop: 80 }}>
              <Button
                title={'Sign Out'}
                onPress={() => [
                  AsyncStorage.removeItem('x-access-token'),
                  logoutUser(dispatch),
                ]}
              />
            </View>
            <View style={styles.order}>
              <Text style={{ fontSize: 20 }}>My Orders</Text>
              <View>
                {orders ? (
                  orders.map((x) => {
                    return <OrderCard key={x.id} {...x} />;
                  })
                ) : (
                  <View style={styles.order}>
                    <Text>You have no orders</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default UserProfile;
