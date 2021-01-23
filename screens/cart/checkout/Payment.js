import React, { useState } from 'react';
import { Button, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  Container,
  Content,
  ListItem,
  Radio,
  Picker,
  Left,
  Right,
  Body,
  Title,
  Header,
} from 'native-base';
let { width } = Dimensions.get('window');
const Payment = (props) => {
  const methods = [
    { name: 'Cash On Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3 },
  ];

  const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'Master Card', value: 3 },
    { name: 'Others', value: 4 },
  ];
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <Header>
        <Body>
          <Title>Please Choose your mode of payment</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, indx) => (
          <ListItem key={item.name} onPress={() => setSelected(item.value)}>
            <Left>
              <Text>{item.name}</Text>
            </Left>
            <Right>
              <Radio selected={selected === item.value} />
            </Right>
          </ListItem>
        ))}
        {selected === 3 ? (
          <Picker
            mode='dropdown'
            iosIcon={<Icon name={'arrow-down'} />}
            headerStyle={{ backgroundColor: 'blue' }}
            headerBackButtonTextStyle={{ color: '#fff' }}
            headerTitleStyle={{ color: '#fff' }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((card, indx) => {
              return (
                <Picker.Item
                  key={card.name}
                  label={card.name}
                  value={card.value}
                />
              );
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <Button
            style={{ flex: 1, width: width }}
            title={'Confirm'}
            onPress={() =>
              props.navigation.navigate('Confirm', { order: order })
            }
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
