import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '../../shared/styledComponents/StyledButton';
let { width } = Dimensions.get('window');

const ListItem = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { item } = props;
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => setIsShowModal(false)}
      >
        <View style={styles.center}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setIsShowModal(false);
              }}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <Icon name='close' size={20} />
            </TouchableOpacity>
            <StyledButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate('ProductForm', { item: item }),
                setIsShowModal(false),
              ]}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </StyledButton>
            <StyledButton
              medium
              danger
              onPress={() => [
                props.handleDeleteItem(props.id),
                setIsShowModal(false),
              ]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </StyledButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: props.index % 2 === 0 ? 'white' : 'gainsboro' },
        ]}
        onPress={() => props.navigation.navigate('Product Detail', { item })}
        onLongPress={() => {
          setIsShowModal(true);
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.image
              ? item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          resizeMode='contain'
        />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.category?.name}
        </Text>
        <Text style={styles.item}>${item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 30,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListItem;
