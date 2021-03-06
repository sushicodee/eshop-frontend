import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import * as actions from './../../redux/actions/cartActions';
import { Left, Right, Container, H1 } from 'native-base';
import { connect } from 'react-redux';
import StyledButton from '../../shared/styledComponents/StyledButton';
import TrafficLight from '../../shared/styledComponents/TraffiicLight';
import Toast from 'react-native-toast-message';
const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [avaliability, setAvaliability] = useState(null);
  const [avaliabilityText, setAvaliabilityText] = useState('');

  useEffect(() => {
    props.route.params.item.countInStock === 0
      ? [
          setAvaliability(<TrafficLight unavaliable />),
          setAvaliabilityText('Unavaliable'),
        ]
      : props.route.params.item.countInStock <= 5
      ? [
          setAvaliability(<TrafficLight limited />),
          setAvaliabilityText('Limited'),
        ]
      : [
          setAvaliability(<TrafficLight avaliable />),
          setAvaliabilityText('Avaliable'),
        ];

    return () => {
      setAvaliability(null);
      setAvaliabilityText('');
    };
  }, []);
  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}> {item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.avaliabilityContainer}>
          <View style={styles.avalibility}>
            <Text style={{ marginRight: 10 }}>
              Avaliability: {avaliabilityText}
            </Text>
            {avaliability}
          </View>
          <Text>{item.description}</Text>
        </View>
        <TrafficLight />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>$ {item.price}</Text>
        </Left>
        <Right>
          <StyledButton
            primary
            large
            onPress={() => {
              [
                props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added to Cart`,
                  text2: 'Go to your cart to complete order',
                }),
              ];
            }}
          >
            <Text style={{ color: 'white' }}>Add to Cart</Text>
          </StyledButton>
        </Right>
      </View>
    </Container>
  );
};
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    padding: 0,
    backgroundColor: 'white',
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: '#5cb85c',
    borderWidth: 2,
    padding: 5,
    borderColor: '#5cb85c',
  },
  avaliabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avalibility: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
export default connect(null, mapDispatchToProps)(SingleProduct);
