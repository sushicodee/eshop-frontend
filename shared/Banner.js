import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

let { width } = Dimensions.get('window');
const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            showButtons={false}
            autoplay={true}
            autoplayTiimeout={3}
            style={{ height: width / 2 }}
          >
            {bannerData.map((item) => (
              <Image
                key={item}
                resizeMode='contain'
                source={{ uri: item }}
                style={styles.imageBanner}
              />
            ))}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007CC7',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default Banner;
