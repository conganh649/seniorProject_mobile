import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {_navigation} from '../../constants';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
const Utils = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <IconOutline name="user" style={styles.icon}></IconOutline>
          <Text style={styles.detail}>Military Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <IconOutline name="home" style={styles.icon}></IconOutline>
          <Text style={styles.detail}>
            {new Date().getFullYear()}'s {'\n'} Cultural Family
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <IconOutline name="notification" style={styles.icon}></IconOutline>
          <Text style={styles.detail}>Send Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Utils;
