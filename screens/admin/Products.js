import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import { Header, Item, Inout, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/core';
import axiosApi from '../../axiosApi';
import Input from '../../shared/form/Input';
import ListItem from './ListItem';
import StyledButton from '../../shared/styledComponents/StyledButton';
let { width, height } = Dimensions.get('window');
const Products = (props) => {
  const [productsList, setProducttsList] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const RenderListHeader = () => {
    return (
      <View elevation={1} style={styles.listHeader}>
        <View style={styles.headerItem}></View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Brand</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Name</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Category</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Price</Text>
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        try {
          const data = await axiosApi.get('product', {}, true);
          setProductsFilter(data.productsList);
          setProducttsList(data.productsList);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      };

      fetchProducts();

      return () => {
        setProducttsList();
        setProductsFilter();
        setIsLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text === '') {
      return setProductsFilter(productsList);
    }
    setProductsFilter(
      productsList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await axiosApi.remove(`product/${id}`, {}, true);
      const product = res.data;
      if (product) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: `${product.name} Removed to Cart`,
          text2: '',
        });
        setProductsFilter(productsFilter.filter((item) => item.id !== id));
      }
    } catch (err) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: `could not remove Item from Cart`,
        text2: '',
      });
    }
  };

  return (
    <View>
      {/* navigation */}
      <View style={styles.navigationContainer}>
        <StyledButton
          large
          secondary
          onPress={() => props.navigation.navigate('Orders')}
        >
          <Icon name='shopping-bag' size={18} color='white' />
          <Text style={styles.navigationText}> Orders</Text>
        </StyledButton>
        <StyledButton
          large
          secondary
          onPress={() => props.navigation.navigate('ProductForm')}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.navigationText}> Product</Text>
        </StyledButton>
        <StyledButton
          large
          secondary
          onPress={() => props.navigation.navigate('Categories')}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.navigationText}> Category</Text>
        </StyledButton>
      </View>
      <View>
        <View>
          <Item style={{ padding: 5 }}>
            <Icon name='search' />
            <Input
              placeholder='Search...'
              onChangeText={(text) => searchProduct(text)}
            />
          </Item>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={RenderListHeader}
          data={productsFilter}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              navigation={props.navigation}
              index={index}
              handleDeleteItem={handleDeleteItem}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: 'white',
  },
  navigationContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navigationText: {
    color: 'white',
    marginLeft: 4,
  },
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  headerItemText: {
    fontWeight: '600',
  },

  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Products;
