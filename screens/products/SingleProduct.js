import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [avaliability, setAvaliability] = useState('');
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
        {/* TODO Description m RichDescription and avaliability */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>$ {item.price}</Text>
        </Left>
        <Right>
          <Button title='Add to Cart' />
        </Right>
      </View>
    </Container>
  );
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
    color: 'red',
  },
});
export default SingleProduct;
