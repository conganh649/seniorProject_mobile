import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import Header from '../../components/header';
import {_navigation} from '../../constants';
import styles from './styles';
const ChangePassword = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>Current password</Text>
        <View style={styles.input_container}>
          <IconOutline name="unlock" style={styles.icon} />
          <TextInput
            placeholder="Type your current password"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>New password</Text>
        <View style={styles.input_container}>
          <IconOutline name="lock" style={styles.icon} />
          <TextInput
            placeholder="Type your new password"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>Confirm new password</Text>
        <View style={styles.input_container}>
          <IconOutline name="lock" style={styles.icon} />
          <TextInput
            placeholder="Type your new password"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.submit_button}>
        <Text style={styles.submit_text}>Change password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePassword;
