import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import {AuthContext} from '../../stores';
import styles from './styles';
const LogIn = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [validId, setValidId] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [statusCode, setStatusCode] = useState();
  const [token, setToken] = useState();
  const handleIdChange = val => {
    const idRegex = /^[0-9]*$/;
    if (idRegex.test(val) && val.trim().length >= 8) {
      setId(val);
      setValidId(true);
    } else {
      setId(val);
      setValidId(false);
    }
  };
  const handlePassChange = val => {
    if (val.trim().length >= 8) {
      setPassword(val);
      setValidPass(true);
    } else {
      setPassword(val);
      setValidPass(false);
    }
  };
  const handleLoginPress = async () => {
    if (validId && validPass && id != null && password != null) {
      await fetch('https://dutsenior.herokuapp.com/api/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCard: id,
          password: password,
        }),
      }).then(async response => {
        let data = await response.json();
        if (response.status === 500) {
          console.log('Wrong ID Card, please type it again');
          alert('Wrong ID Card. Please try again!');
        } else if (response.status === 401) {
          console.log('Wrong password, please type it again');
          alert('Wrong Password. Please try again!');
        } else if (response.status === 200) {
          console.log(data.data);
          await AsyncStorage.setItem('token', data.data.token);
          await AsyncStorage.setItem(
            'role',
            data.data.userInfo.role === 'Manager' ? 'Manager' : 'User',
          );
          await AsyncStorage.setItem('id', data.data.userInfo.id_user);
          signIn(data.data.token);
        }
      });
    } else {
      alert('Please check your ID Card & Password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios' ? true : false}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/bg.jpg')}>
        <View style={styles.form}>
          <Text style={styles.text_header}>Login</Text>
          <Animatable.View animation="zoomInUp" style={styles.wrap_input}>
            <View style={styles.input_component}>
              <Text style={styles.input_label}>ID Card</Text>
              <View style={styles.input_container}>
                <IconOutline name="idcard" style={styles.icon} />
                <TextInput
                  placeholder="Type your ID Card"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={val => handleIdChange(val)}
                />
                {validId && id != null ? (
                  <Animatable.View animation="bounceIn">
                    <IconFill name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>
            {validId ? null : (
              <Animatable.View
                animation="fadeInLeft"
                duration={500}
                style={styles.error_msg}>
                <Text style={styles.error}>
                  ID card must be more than 8 digits
                </Text>
              </Animatable.View>
            )}
            <View style={styles.input_component}>
              <Text style={styles.input_label}>Password</Text>
              <View style={styles.input_container}>
                <IconOutline name="lock" style={styles.icon} />
                <TextInput
                  placeholder="Type your password"
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={val => handlePassChange(val)}
                />
                {validPass && password != null ? (
                  <Animatable.View animation="bounceIn">
                    <IconFill name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>
            {validPass ? null : (
              <Animatable.View
                animation="fadeInLeft"
                duration={500}
                style={styles.error_msg}>
                <Text style={styles.error}>
                  Password must be more than 8 characters
                </Text>
              </Animatable.View>
            )}
            <View style={styles.button}>
              <TouchableOpacity onPress={() => handleLoginPress()}>
                <LinearGradient
                  colors={['#6EC9B8', '#37AFB0']}
                  start={{x: -1, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.button_container}>
                  <Text style={styles.button_text}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.signup_div}>
              <Text style={styles.normal_text}>Don't have an account?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate(_navigation.Register)}>
                <Text style={styles.signup_text}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
