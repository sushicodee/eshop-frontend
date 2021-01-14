import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Header, Icon, Item, Input, Container, Text } from 'native-base';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';
const data = require('./../../assets/data/products.json');
const categories = require('./../../assets/data/categories.json');

const { width, height } = Dimensions.get('window');
const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [productCtg, setProductCtg] = useState([]);

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
    setCategory(categories);
    setActive(-1);
    setInitialState(data);
    setProductCtg(data);

    return () => {
      setProducts([]);
      setFilteredProducts([]);
      setFocus();
      setCategory([]);
      setProductCtg([]);
      setActive();
      setInitialState();
    };
  }, []);

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
            setProductCtg(products.filter((i) => i.category.$oid === ctg.$oid)),
            setActive(true),
          ];
    }
  };

  return (
    <View>
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
                categories={categories}
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
                      key={item.$oid}
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
    </View>
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
});

export default ProductContainer;
