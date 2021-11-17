import React from 'react';
import {SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import {IconOutline} from '@ant-design/icons-react-native';
import styles from './styles';
import {_navigation} from '../../constants';
const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.user_info_section}>
        <View style={styles.ava_info}>
          <Image
            style={styles.image}
            source={require('../../assets/images/bg.jpg')}></Image>
          <View style={{marginLeft: '10%'}}>
            <Title style={styles.title}>201814586</Title>
            <Caption style={styles.caption}>@Tran Cong Anh</Caption>
          </View>
        </View>
      </View>

      <View style={styles.user_info_section}>
        <View style={styles.row}>
          <IconOutline name="phone" style={styles.icon}></IconOutline>
          <Text style={styles.text}>0905157666</Text>
        </View>
        <View style={styles.row}>
          <IconOutline name="compass" style={styles.icon}></IconOutline>
          <Text style={styles.text}>150 Trần Cao Vân</Text>
        </View>
        <View style={styles.row}>
          <IconOutline name="calendar" style={styles.icon}></IconOutline>
          <Text style={styles.text}>01/01/1999</Text>
        </View>
      </View>

      <View style={styles.info_box_wrapper}>
        <View
          style={[
            styles.info_box,
            {borderRightColor: '#dddddd', borderRightWidth: 2},
          ]}>
          <Title style={styles.box_title}>User</Title>
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
        <TouchableOpacity>
          <View style={styles.menu_item}>
            <IconOutline
              style={styles.menu_icon}
              name="question-circle"
              color="#39D5D5"></IconOutline>
            <Text style={styles.menu_item_text}>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
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
