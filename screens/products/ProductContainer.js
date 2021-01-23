import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Header, Icon, Item, Input, Container, Text } from 'native-base';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';
import axiosApi from '../../axiosApi';
// const data = require('./../../assets/data/products.json');
// const categories = require('./../../assets/data/categories.json');

const { width, height } = Dimensions.get('window');
const ProductContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [productCtg, setProductCtg] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await axiosApi.get('product');
          const { productsList } = data;
          setProducts(productsList);
          setFilteredProducts(productsList);
          setInitialState(productsList);
          setProductCtg(productsList);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      const fetchCategories = async () => {
        try {
          const data = await axiosApi.get('category');
          const { categoryList } = data;
          setCategory(categoryList);
        } catch (err) {}
      };
      setActive(-1);
      fetchData();
      fetchCategories();
      return () => {
        setProducts([]);
        setFilteredProducts([]);
        setFocus();
        setCategory([]);
        setProductCtg([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProducts = (text) => {
    setFilteredProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Category
  const changeCategory = (ctg) => {
    {
      ctg === 'All'
        ? [setProductCtg(initialState), setActive(true)]
        : [
            console.log(products.find((i) => i.category.id === ctg)),
            setProductCtg(products.filter((i) => i.category.id == ctg)),
            setActive(true),
          ];
    }
  };

  return (
    <>
      {!loading ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name='ios-search' />
              <Input
                onChangeText={(text) => searchProducts(text)}
                onFocus={openList}
                onBlur={onBlur}
                placeholder='search...'
              />
              {focus && <Icon name='ios-close' onPress={onBlur} />}
            </Item>
          </Header>
          {focus ? (
            <SearchedProduct
              navigation={props.navigation}
              filteredProducts={filteredProducts}
            />
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <Banner />
                <View>
                  <CategoryFilter
                    categories={category}
                    CategoryFilter={changeCategory}
                    productCtg={productCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item.id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={(styles.center, { height: '40%' })}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        <Container style={[styles.center, styles.loadingContainer]}>
          <ActivityIndicator size='large' color='red' />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { width: width, flexWrap: 'wrap', backgroundColor: 'gainsboro' },
  listContainer: {
    width,
    height,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: '#f2f2f2',
  },
});

export default ProductContainer;
