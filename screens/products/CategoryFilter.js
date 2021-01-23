import React from 'react';

import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';
const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: '#4DA8DA' }}
    >
      <ListItem style={{ margin: 0, borderRadius: 0, padding: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.CategoryFilter('All'), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active === -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: 'white' }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => [
                props.CategoryFilter(item.id),
                props.setActive(props.categories.indexOf(item)),
              ]}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5 },
                  props.active === props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={{ color: 'white' }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#007CC7',
  },
  inactive: {
    backgroundColor: '#000',
  },
});

export default CategoryFilter;
