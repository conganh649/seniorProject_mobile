import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {_navigation} from '../../../constants';
import styles from './styles';
const NewsCard = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(props.data._id);
        props.navigation.navigate(_navigation.NewsDetail, {
          id: props.data._id,
          navigation: props.navigation,
        });
      }}>
      <Image style={styles.image} source={{uri: props.data.image}}></Image>
      <Text style={styles.name}>{props.data.title}</Text>
      <Text style={styles.description}>
        {props.data.description?.slice(0, 200)}...
      </Text>
    </TouchableOpacity>
  );
};

export default NewsCard;
