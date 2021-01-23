import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimentions,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosApi from '../../axiosApi';
import StyledButton from './../../shared/styledComponents/StyledButton';

let { width } = Dimensions.get('window');

const Item = (props) => {
  const { name, id } = props.item;
  return (
    <View key={id} style={styles.item}>
      <Text>{name}</Text>
      <StyledButton
        medium
        danger
        onPress={() => props.handleDeleteCategory(id)}
      >
        <Icon name='trash' size={30} color='white' />
        {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text> */}
      </StyledButton>
    </View>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categoryList } = await axiosApi.get('category');
        setCategories(categoryList);
      } catch (err) {
        alert('Error Loading Categories');
      }
    };
    fetchCategories();

    return () => {
      setCategories();
    };
  }, []);

  const handleAddCategory = async () => {
    if (categoryName === '') return;
    const data = {
      name: categoryName,
    };
    try {
      const { data } = await axiosApi.post('category', data, {}, true);
      setCategories([...categories, data]);
    } catch (err) {
      alert('Error loading Categories');
    }
    setCategoryName('');
  };

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axiosApi.remove(`category/${id}`, {}, true);
      setCategories(categories.filter((c) => c.id !== data.id));
    } catch (err) {}
  };
  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              handleDeleteCategory={handleDeleteCategory}
            ></Item>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name='plus' />
          <Text> Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <StyledButton medium primary onPress={() => handleAddCategory()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 60,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export default Categories;
