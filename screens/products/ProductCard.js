import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Dimensions,
} from 'react-native';

let { width } = Dimensions.get('window');

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
        resizeMode='contain'
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button color='green' title='Add' />
        </View>
      ) : (
        <Text styles={{ marginTop: 20 }}>Currently unavaliable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginLeft: 10,
    marginBottom: 5,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 10,
    color: 'orange',
    marginTop: 10,
  },
});

export default ProductCard;
