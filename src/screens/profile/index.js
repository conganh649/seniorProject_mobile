import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {IconOutline} from '@ant-design/icons-react-native';
import styles from './styles';
import {_navigation, apiUrl} from '../../constants';
import {AuthContext} from '../../stores';
const Profile = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [data, setData] = useState({
    idCard: '',
    name: '',
    phoneNumber: '',
    address: '',
    dob: '',
    role: '',
  });
  const loadProfile = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/users?id=` + id, {
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
            dob: dob,
            role: responseJson.role,
          });
        }
      });
  };

  const setDevice = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/users/` + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fcm_token: '',
      }),
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.user_info_section}>
        <View style={styles.ava_info}>
          <Image
            style={styles.image}
            source={require('../../assets/images/bg.jpg')}></Image>
          <View style={{marginLeft: '10%'}}>
            <Title style={styles.title}>{data.idCard}</Title>
            <Caption style={styles.caption}>
              @{data.name ? data.name : 'NaN'}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.user_info_section}>
        <View style={styles.row}>
          <IconOutline name="phone" style={styles.icon}></IconOutline>
          <Text style={styles.text}>
            {data.phoneNumber ? data.phoneNumber : 'NaN'}
          </Text>
        </View>
        <View style={styles.row}>
          <IconOutline name="compass" style={styles.icon}></IconOutline>
          <Text style={styles.text}>{data.address ? data.address : 'NaN'}</Text>
        </View>
        <View style={styles.row}>
          <IconOutline name="calendar" style={styles.icon}></IconOutline>
          <Text style={styles.text}>{data.dob}</Text>
        </View>
      </View>

      <View style={styles.info_box_wrapper}>
        <View
          style={[
            styles.info_box,
            {borderRightColor: '#dddddd', borderRightWidth: 2},
          ]}>
          <Title style={styles.box_title}>{data.role}</Title>
          <Caption style={styles.caption}>Role</Caption>
        </View>
        <View style={styles.info_box}>
          <Title style={styles.box_title}>25</Title>
          <Caption style={styles.caption}>Coupons</Caption>
        </View>
      </View>

      <View style={styles.menu_wrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate(_navigation.EditProfile)}>
          <View style={styles.menu_item}>
            <IconOutline style={styles.menu_icon} name="edit" color="#39D5D5" />
            <Text style={styles.menu_item_text}>Update your profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(_navigation.ChangePassword)}>
          <View style={styles.menu_item}>
            <IconOutline
              style={styles.menu_icon}
              name="lock"
              color="#39D5D5"></IconOutline>
            <Text style={styles.menu_item_text}>Change password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert('Please contact 093.245.8886 for support');
          }}>
          <View style={styles.menu_item}>
            <IconOutline
              style={styles.menu_icon}
              name="question-circle"
              color="#39D5D5"></IconOutline>
            <Text style={styles.menu_item_text}>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDevice();
            signOut();
          }}>
          <View style={styles.menu_item}>
            <IconOutline
              style={styles.menu_icon}
              name="logout"
              color="#39D5D5"></IconOutline>
            <Text style={styles.menu_item_text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
