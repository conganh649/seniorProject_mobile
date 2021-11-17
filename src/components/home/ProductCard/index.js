import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {_navigation} from '../../../constants';
import styles from './styles';
const txt =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s';
const ProductCard = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate(props.click, {back: _navigation.Home})
      }>
      <Image
        style={styles.image}
        source={require('../../../assets/images/bg.jpg')}></Image>
      <View style={styles.info}>
        <Text style={styles.name}>Combo 1</Text>
        <Text style={styles.description}>{txt.slice(0, 70)}</Text>
        <Text style={styles.price}>300.000 Đ</Text>
        <Text style={styles.quantity}>50</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
