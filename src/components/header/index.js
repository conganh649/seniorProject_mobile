import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
const Header = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          style={styles.back}
          source={require('../../assets/icons/header/back.png')}></Image>
      </TouchableOpacity>
      <Text style={styles.text}>{props.headerName}</Text>
    </View>
  );
};

export default Header;
