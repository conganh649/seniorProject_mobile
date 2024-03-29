import React, {useState} from 'react';
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
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const Register = ({navigation}) => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [validId, setValidId] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState();
  const [validConfirm, setValidConfirm] = useState(true);
  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState(true);
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
  const handleConfirmPassChange = val => {
    if (val.trim() === password) {
      setConfirmPass(val);
      setValidConfirm(true);
    } else {
      setConfirmPass(val);
      setValidConfirm(false);
    }
  };
  const handleEmailChange = val => {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mailRegex.test(val)) {
      setEmail(val);
      setValidEmail(true);
    } else {
      setEmail(val);
      setValidEmail(false);
    }
  };
  const handleRegister = async () => {
    if (
      validId &&
      validPass &&
      id != null &&
      password != null &&
      validConfirm &&
      confirmPass != null &&
      validEmail &&
      email != null
    ) {
      await fetch(`${apiUrl}api/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCard: id,
          password: password,
          email: email,
        }),
      }).then(async response => {
        let data = await response.json();
        if (response.status === 500) {
          alert('Email is already used, please change your email');
        } else if (response.status === 409) {
          alert('ID Card is already used, please change your ID Card');
        } else if (response.status === 200) {
          alert('Register successfully');
          navigation.navigate(_navigation.LogIn);
        }
      });
    } else {
      alert('Please check your information');
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
          <Text style={styles.text_header}>Register</Text>
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
            <View style={styles.input_component}>
              <Text style={styles.input_label}>Confirm password</Text>
              <View style={styles.input_container}>
                <IconOutline name="lock" style={styles.icon} />
                <TextInput
                  placeholder="Type your password"
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={val => handleConfirmPassChange(val)}
                />
                {validConfirm && confirmPass != null ? (
                  <Animatable.View animation="bounceIn">
                    <IconFill name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>
            {validConfirm ? null : (
              <Animatable.View
                animation="fadeInLeft"
                duration={500}
                style={styles.error_msg}>
                <Text style={styles.error}>
                  It must be the same as password
                </Text>
              </Animatable.View>
            )}
            <View style={styles.input_component}>
              <Text style={styles.input_label}>Email</Text>
              <View style={styles.input_container}>
                <IconOutline name="mail" style={styles.icon} />
                <TextInput
                  placeholder="Type your email"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={val => handleEmailChange(val)}
                />
                {validEmail && email != null ? (
                  <Animatable.View animation="bounceIn">
                    <IconFill name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>
            {validEmail ? null : (
              <Animatable.View
                animation="fadeInLeft"
                duration={500}
                style={styles.error_msg}>
                <Text style={styles.error}>Wrong Email format</Text>
              </Animatable.View>
            )}
            <View style={styles.button}>
              <TouchableOpacity onPress={() => handleRegister()}>
                <LinearGradient
                  colors={['#6EC9B8', '#37AFB0']}
                  start={{x: -1, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.button_container}>
                  <Text style={styles.button_text}>REGISTER</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.signup_div}>
              <Text style={styles.normal_text}>Already have an account?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate(_navigation.LogIn)}>
                <Text style={styles.signup_text}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Register;
