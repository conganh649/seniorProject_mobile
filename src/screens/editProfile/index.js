import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import styles from './styles';
const EditProfile = ({navigation}) => {
  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    idCard: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: '',
    role: '',
    gender: '',
    showDate: '',
  });
  const [validPhone, setValidPhone] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const handleSubmit = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    if (validPhone && validName && validAddress && validEmail) {
      await fetch('https://dutsenior.herokuapp.com/api/users/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender,
          dateofbirth: data.dob,
          email: data.email,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          navigation.goBack();
        });
    } else {
      alert('Please check your info again');
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let dob =
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear();
    setData({...data, showDate: dob, dob: currentDate});
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const handlePhoneChange = val => {
    let phoneRegex = /^[0-9]*$/;
    if (phoneRegex.test(val) && val.trim().length == 10) {
      setData({
        ...data,
        phoneNumber: val,
      });
      setValidPhone(true);
    } else {
      setData({
        ...data,
        phoneNumber: val,
      });
      setValidPhone(false);
    }
  };

  const handleNameChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        name: val,
      });
      setValidName(true);
    } else {
      setData({
        ...data,
        name: val,
      });
      setValidName(false);
    }
  };

  const handleAddressChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        address: val,
      });
      setValidAddress(true);
    } else {
      setData({
        ...data,
        address: val,
      });
      setValidAddress(false);
    }
  };

  const handlEmailChange = val => {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mailRegex.test(val)) {
      setData({
        ...data,
        email: val,
      });
      setValidEmail(true);
    } else {
      setData({
        ...data,
        email: val,
      });
      setValidEmail(false);
    }
  };

  const loadProfile = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/users?id=' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let date = new Date(responseJson.dateofbirth);
        let dob =
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear();
        if (responseJson) {
          setData({
            ...data,
            idCard: responseJson.idCard,
            name: responseJson.fullName,
            phoneNumber: responseJson.phoneNumber,
            address: responseJson.address,
            dob: responseJson.dateofbirth,
            role: responseJson.role,
            gender: responseJson.gender,
            showDate: dob,
            email: responseJson.email,
          });
          setDate(date);
        }
      });
  };
  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>ID Card</Text>
        <View style={styles.input_container}>
          <IconOutline name="idcard" style={styles.icon} />
          <TextInput
            placeholder="Type your ID Card"
            style={styles.input}
            autoCapitalize="none"
            value={data.idCard}
            editable={false}></TextInput>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Phone number</Text>
        <View style={styles.input_container}>
          <IconOutline name="phone" style={styles.icon} />
          <TextInput
            placeholder="Type your phone number"
            style={styles.input}
            autoCapitalize="none"
            value={data.phoneNumber}
            onChangeText={val => handlePhoneChange(val)}
          />
          {validPhone && data.phoneNumber != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validPhone && data.phoneNumber !== null ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>Phone number must be 10 digits</Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Fullname</Text>
        <View style={styles.input_container}>
          <IconOutline name="user" style={styles.icon} />
          <TextInput
            placeholder="Type your fullname"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => handleNameChange(val)}
            value={data.name}
          />
          {validName && data.name != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validName && data.name !== null ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>
              Fullname must be more than 4 characters
            </Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Email</Text>
        <View style={styles.input_container}>
          <IconOutline name="mail" style={styles.icon} />
          <TextInput
            placeholder="Type your Email"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => handlEmailChange(val)}
            value={data.email}
          />
          {validEmail && data.email != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validEmail && data.email !== null ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>Wrong Email format</Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Address</Text>
        <View style={styles.input_container}>
          <IconOutline name="compass" style={styles.icon} />
          <TextInput
            placeholder="Type your address"
            style={styles.input}
            autoCapitalize="none"
            value={data.address}
            onChangeText={val => handleAddressChange(val)}
          />
          {validAddress && data.address != null ? (
            <Animatable.View animation="bounceIn">
              <IconFill name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {validAddress && data.address !== null ? null : (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
            style={styles.error_msg}>
            <Text style={styles.error}>
              Address must be more than 4 characters
            </Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Gender</Text>
        <View style={styles.input_container}>
          <IconOutline name="user" style={styles.icon} />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              setData({...data, gender: itemValue});
            }}
            style={styles.input}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Date of birth</Text>
        <View style={styles.input_container}>
          <IconOutline name="calendar" style={styles.icon} />
          <TextInput style={styles.input} editable={false}>
            {data.showDate}
          </TextInput>
          <TouchableOpacity onPress={showDatepicker} style={styles.date_button}>
            <Text style={styles.date_text}>Change</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.submit_button}
        onPress={() => handleSubmit()}>
        <Text style={styles.submit_text}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
