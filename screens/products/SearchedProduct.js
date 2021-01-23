import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Content,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Text,
  Item,
} from 'native-base';
let { width } = Dimensions.get('window');
const SearchedProduct = (props) => {
  const { filteredProducts } = props;
  return (
    <View style={{ width: width }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <ListItem
            onPress={() =>
              props.navigation.navigate('Product Detail', { item: item })
            }
            key={item.id}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note> {item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No Product Matches in the Searched Criteria{' '}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProduct;
