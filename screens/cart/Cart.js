import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Right, H1, Left } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as actions from './../../redux/actions/cartActions';
import CartItem from './CartItem';
import StyledButton from '../../shared/styledComponents/StyledButton';
import AuthGlobal from './../../context/store/AuthGlobal';
let { height, width } = Dimensions.get('window');

export const Cart = (props) => {
  const context = useContext(AuthGlobal);

  var total = 0;
  props.cartItems.forEach((data) => {
    return (total += data.product.price);
  });
  total = total.toFixed(2);
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: 'center' }}>Cart </H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => {
                    props.removeFromCart(data.item);
                  }}
                >
                  <Icons name='trash' color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${total}</Text>
            </Left>
            <Right>
              <StyledButton danger medium onPress={() => props.clearCart()}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </StyledButton>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (
                <StyledButton
                  medium
                  secondary
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                  <Text style={{ color: 'white' }}>Checkout</Text>
                </StyledButton>
              ) : (
                <StyledButton
                  secondary
                  medium
                  onPres={() => {
                    props.navigation.navigate('Login');
                  }}
                >
                  <Text>Login</Text>
                </StyledButton>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add Products to your cart to get Started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 2,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: '#5cb85c',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
