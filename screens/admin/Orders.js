import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import OrderCard from '../../shared/order/OrderCard';
import {
  fetchOrders,
  updateOrder,
} from './../../redux/actions/admin/orderActions';
import { useSelector, useDispatch } from 'react-redux';

const Orders = (props) => {
  const dispatch = useDispatch();
  const orderStore = useSelector((state) => state.orderStore);
  const { orders, isLoading, errors } = orderStore;
  const handleUpdateOrder = (order) => {
    dispatch(updateOrder(order));
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders(dispatch);
    }, [])
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={30} color={'red'} />
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item, index }) => (
            <OrderCard
              navigation={props.navigation}
              {...item}
              handleUpdateOrder={handleUpdateOrder}
              editMode={true}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Orders;
