import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {_navigation} from '../../../constants';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);
import styles from './styles';
const NotificationCard = props => {
  const timeAgo = new TimeAgo('en-US');
  const date = new Date(props.data.createdDate);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.data.title}</Text>
      <Text style={styles.description}>{props.data.body?.slice(0, 75)}</Text>
      <Text style={styles.quantity}>{timeAgo.format(date)}</Text>
    </View>
  );
};

export default NotificationCard;
