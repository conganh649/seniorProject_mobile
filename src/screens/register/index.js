import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {IconOutline} from '@ant-design/icons-react-native';
import {_navigation} from '../../constants';
import styles from './styles';
const Register = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
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
                  autoCapitalize="none"></TextInput>
              </View>
            </View>

            <View style={styles.input_component}>
              <Text style={styles.input_label}>Password</Text>
              <View style={styles.input_container}>
                <IconOutline name="lock" style={styles.icon} />
                <TextInput
                  placeholder="Type your password"
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"></TextInput>
              </View>
            </View>

            <View style={styles.input_component}>
              <Text style={styles.input_label}>Confirm password</Text>
              <View style={styles.input_container}>
                <IconOutline name="lock" style={styles.icon} />
                <TextInput
                  placeholder="Type your password"
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"></TextInput>
              </View>
            </View>

            <View style={styles.input_component}>
              <Text style={styles.input_label}>Email</Text>
              <View style={styles.input_container}>
                <IconOutline name="mail" style={styles.icon} />
                <TextInput
                  placeholder="Type your email"
                  style={styles.input}
                  autoCapitalize="none"></TextInput>
              </View>
            </View>

            <View style={styles.button}>
              <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Register;
