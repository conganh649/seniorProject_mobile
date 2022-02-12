import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {_navigation} from '../../../constants';
import styles from './styles';
const ProductCard = props => {
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate(props.click, {id: props.product._id})
      }>
      <Image
        style={styles.image}
        source={{uri: props.product.productThumbnail}}></Image>
      <View style={styles.info}>
        <Text style={styles.name}>{props.product.productName}</Text>
        <Text style={styles.description}>
          {props.product.description.slice(0, 30)}
        </Text>
        <Text style={styles.price}>
          {handlePriceFormat(props.product.price)} VND
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
