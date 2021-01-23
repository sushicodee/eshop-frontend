import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Item, Picker } from 'native-base';
import Input from '../../shared/form/Input';
import FormContainer from '../../shared/form/FormContainer';
import * as ImagePicker from 'expo-image-picker';
import StyledButton from './../../shared/styledComponents/StyledButton';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorView from './../../shared/ErrorView';
import axiosApi from '../../axiosApi';
import { useForm } from '../../shared/hooks/useForm';
import { productValidator } from '../../shared/validators/productValidator';
import { camelCaseToWords } from './../../shared/helpers/camelCaseToWords';
import mime from 'mime';

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [mainImage, setMainImage] = useState();
  const [image, setImage] = useState();
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [formName, setFormName] = useState('Add Product');
  const [isError, setisError] = useState(false);
  const formFields = [
    { name: 'name', type: 'string' },
    { name: 'brand', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'countInStock', type: 'number', default: 0 },
    { name: 'description', type: 'string' },
    { name: 'richDescription', type: 'string' },
    { name: 'rating', type: 'number', default: 0 },
    { name: 'isFeatured', type: 'boolean', default: false },
  ];
  const newInitialState = {};
  formFields.forEach((item) => {
    item.type
      ? (newInitialState[item.name] = item.default)
      : (newInitialState[item.name] = '');
  });
  const [initialState, setInitialState] = useState(newInitialState);

  const { values, setValues, onSubmit, onChange, errors, seterrors } = useForm(
    handleSubmit,
    initialState
  );
  useEffect(() => {
    const checkPage = () => {
      if (!props.route.params) {
        return;
      }
      setFormName('Edit Product');
      const {
        item: {
          id,
          name,
          brand,
          category: { id: categoryId },
          price,
          countInStock,
          image,
          description,
          richDescription,
          rating,
          isFeatured: isFeatured,
        },
      } = props.route.params;
      const data = {
        id,
        name,
        brand,
        price: price?.toString(),
        category: categoryId,
        countInStock: countInStock?.toString(),
        description,
        richDescription,
        rating: rating?.toString(),
        isFeatured,
      };
      setImage(image);
      setMainImage(image);
      setValues(data);
      setPickerValue(data.category);
    };
    const accessimagePicker = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry ,we need camera role permission to attach an image');
        }
      }
    };
    const fetchCategories = async () => {
      try {
        const data = await axiosApi.get('category');
        const { categoryList } = data;
        setCategories(categoryList);
      } catch (err) {
        alert('Error loading categories');
      }
    };
    checkPage();
    accessimagePicker();
    fetchCategories();
    return () => {
      setCategories([]);
    };
  }, []);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setMainImage(result.uri);
        setImage(result.uri);
      }
    } catch (err) {}
  };

  async function handleSubmit() {
    const { isValid, errors } = productValidator(initialState, values);
    if (isValid && image) {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      const newImageUri =
        Platform.OS === 'ios'
          ? 'file:///' + image.split('file:/').join('')
          : image;
      formData.append('image', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });
      try {
        if (values.id) {
          const res = await axiosApi.put(
            `product/${values.id}`,
            values,
            {},
            true
          );
          Toast.show({
            marginTop: 60,
            type: 'success',
            text1: `${res.updatedProduct.name} updated successfully`,
            text2: '',
          });
        } else {
          const res = await axiosApi.postFile('product', formData, {}, true);
          Toast.show({
            marginTop: 60,
            type: 'success',
            text1: `${res.data.name} added successfully`,
            text2: '',
          });
        }

        setTimeout(() => props.navigation.navigate('Product'), 500);
      } catch (err) {
        Toast.show({
          marginTop: 60,
          type: 'error',
          text1: `${
            typeof err.data.message === 'string'
              ? err.data.message
              : 'Something went wrong'
          }`,
        });
      }
    } else if (isValid && !image) {
      // console.log('post without image');
      try {
        if (values.id) {
          const res = await axiosApi.put(
            `product/${values.id}`,
            values,
            {},
            true
          );
        } else {
          const res = await axiosApi.post('product', values, {}, true);
        }
        Toast.show({
          marginTop: 60,
          type: 'success',
          text1: `${values.name} updated successfully`,
          text2: '',
        });
        setTimeout(() => props.navigation.navigate('Products'), 500);
      } catch (err) {
        Toast.show({
          marginTop: 60,
          type: 'error',
          text1: err.data.message,
          text2: 'Please Try Again',
        });
      }
    } else {
      let text2 = '';
      for (let key in errors) {
        text2 += errors[key] + '\n';
      }
      Toast.show({
        marginTop: 60,
        type: 'error',
        text1: 'Something Went Wrong',
        text2,
      });
    }
  }
  return (
    <FormContainer title={formName}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => handlePickImage()}
        >
          <Icon style={{ color: 'white' }} name='camera' />
        </TouchableOpacity>
      </View>
      {formFields.map((field, index) => {
        const additionalNumberProps =
          field.type === 'number' ? { keyboardType: 'numeric' } : null;
        return (
          <>
            <View style={styles.label}>
              <Text style={{ textDecorationLine: 'underline' }}>
                {camelCaseToWords(field.name)}
              </Text>
            </View>
            <Input
              key={field.name}
              placeholder={field.name}
              name={field.name}
              id={field.name}
              value={values[field.name]}
              onChangeText={(text) => onChange(field.name, text)}
              {...additionalNumberProps}
            />
          </>
        );
      })}
      <Item picker>
        <Picker
          mode='dropdown'
          iosIcon={<Icon color={'#007aff'} name='arrow-down' />}
          style={{ width: undefined }}
          placeholder='Select your Category'
          placeholderIconColor='#007aff'
          selectedValue={pickerValue}
          onValueChange={(e) => [setPickerValue(e), onChange('category', e)]}
        >
          {categories.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </Item>
      {isError ? <ErrorView message={isError} /> : null}
      <View style={styles.buttonContainer}>
        <StyledButton large primary onPress={onSubmit}>
          <Text style={styles.buttonText}>Confirm</Text>
        </StyledButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: 'blue',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
