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
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/header';
import {_navigation, apiUrl} from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
const ChangePassword = ({navigation}) => {
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [validNew, setValidNew] = useState(true);
  const [validConfirm, setValidConfirm] = useState(true);

  const handleChange = async () => {
    if (validNew && validConfirm && oldPass != null && newPass != null) {
      let id = await AsyncStorage.getItem('id');
      let token = await AsyncStorage.getItem('token');
      await fetch(`${apiUrl}api/users/pass/` + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPass,
          newPassword: newPass,
        }),
      }).then(async response => {
        if (response.status === 400) {
          alert('Your current password is wrong. Please try again');
        } else if (response.status === 200) {
          navigation.goBack();
        }
      });
    } else {
      alert('Please check your current password & Confirm password again');
    }
  };
  const handleOldChange = val => {
    setOldPass(val);
  };

  const handlePassChange = val => {
    if (val.trim().length >= 8) {
      setNewPass(val);
      setValidNew(true);
    } else {
      setNewPass(val);
      setValidNew(false);
    }
  };
  const handleConfirmPassChange = val => {
    if (val.trim() === newPass) {
      setConfirmPass(val);
      setValidConfirm(true);
    } else {
      setConfirmPass(val);
      setValidConfirm(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header headerName="Change password" navigation={navigation}></Header>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>Current password</Text>
        <View style={styles.input_container}>
          <IconOutline name="unlock" style={styles.icon} />
          <TextInput
            placeholder="Type your current password"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => handleOldChange(val)}></TextInput>
        </View>
      </View>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>New password</Text>
        <View style={styles.input_container}>
          <IconOutline name="lock" style={styles.icon} />
          <TextInput
            placeholder="Type your new password"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => handlePassChange(val)}></TextInput>
          {validNew && newPass != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validNew ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>
              Password must be more than 8 characters
            </Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Confirm new password</Text>
        <View style={styles.input_container}>
          <IconOutline name="lock" style={styles.icon} />
          <TextInput
            placeholder="Type your new password"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => handleConfirmPassChange(val)}></TextInput>
          {validConfirm && confirmPass != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validConfirm ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>It must be the same as password</Text>
          </Animatable.View>
        )}
      </View>

      <TouchableOpacity
        style={styles.submit_button}
        onPress={() => handleChange()}>
        <Text style={styles.submit_text}>Change password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePassword;
