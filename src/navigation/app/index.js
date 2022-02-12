import React, {useEffect, useState} from 'react';
import LogIn from '../../screens/login';
import Register from '../../screens/register';
import News from '../../screens/news';
import NewsDetail from '../../screens/newsDetail';
import Home from '../../screens/home';
import Profile from '../../screens/profile';
import EditProfile from '../../screens/editProfile';
import ChangePassword from '../../screens/changePassword';
import AllProducts from '../../screens/allProducts';
import ProductDetail from '../../screens/productDetail';
import Cart from '../../screens/cart';
import OrderManage from '../../screens/orderManage';
import FamilyManage from '../../screens/familyManage';
import CulturalFamily from '../../screens/culturalDetail';
import Military from '../../screens/military';
import Utils from '../../screens/management';
import Notification from '../../screens/notifications';
import AsyncStorage from '@react-native-community/async-storage';
import {IconFill} from '@ant-design/icons-react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDetail from '../../screens/orderDetail';
import FamilyDetail from '../../screens/familyDetail';
const Drawer = createDrawerNavigator();
const drawerStack = {
  News: {
    screen: News,
    options: {
      title: 'News',
      drawerIcon: ({focused}) => (
        <IconFill
          name="read"
          size={20}
          color={focused ? '#39D5D5' : 'black'}></IconFill>
      ),
    },
  },
  Profile: {
    screen: Profile,
    options: {
      title: 'Profile',
      drawerIcon: ({focused}) => (
        <IconFill
          name="profile"
          size={20}
          color={focused ? '#39D5D5' : 'black'}></IconFill>
      ),
    },
  },
};

export const DrawerNavigation = () => {
  const [role, setRole] = useState();
  const getRole = async () => {
    let role = await AsyncStorage.getItem('role');
    setRole(role);
  };

  useEffect(() => {
    getRole();
  }, []);
  return (
    <Drawer.Navigator>
      {Object.entries({
        ...drawerStack,
      }).map(([name, component]) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={component.screen}
          options={{...component.options}}></Drawer.Screen>
      ))}
      {role !== 'Manager' ? (
        <Drawer.Screen
          name={'Supply Order'}
          component={Home}
          options={{
            title: 'Supply Order',
            drawerIcon: ({focused}) => (
              <IconFill
                name="home"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}

      {role !== 'Manager' ? (
        <Drawer.Screen
          name={'Cart'}
          component={Cart}
          options={{
            title: 'Cart',
            drawerIcon: ({focused}) => (
              <IconFill
                name="shopping"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}
      {role === 'Manager' ? (
        <Drawer.Screen
          name={'Order Management'}
          component={OrderManage}
          options={{
            title: 'Order Management',
            drawerIcon: ({focused}) => (
              <IconFill
                name="folder"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}

      {role === 'Manager' ? (
        <Drawer.Screen
          name={'Family Management'}
          component={FamilyManage}
          options={{
            title: 'Family Management',
            drawerIcon: ({focused}) => (
              <IconFill
                name="insurance"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}

      {role === 'Manager' ? (
        <Drawer.Screen
          name={'General Management'}
          component={Utils}
          options={{
            title: 'General Management',
            drawerIcon: ({focused}) => (
              <IconFill
                name="tool"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}
      <Drawer.Screen
        name={'Notifications'}
        component={Notification}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused}) => (
            <IconFill
              name="notification"
              size={20}
              color={focused ? '#39D5D5' : 'black'}></IconFill>
          ),
        }}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={DrawerNavigation}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}></Stack.Screen>
      <Stack.Screen name="AllProducts" component={AllProducts}></Stack.Screen>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}></Stack.Screen>
      <Stack.Screen name="OrderDetail" component={OrderDetail}></Stack.Screen>
      <Stack.Screen name="FamilyDetail" component={FamilyDetail}></Stack.Screen>
      <Stack.Screen
        name="CulturalFamily"
        component={CulturalFamily}></Stack.Screen>
      <Stack.Screen name="Military" component={Military}></Stack.Screen>
      <Stack.Screen name="News" component={News}></Stack.Screen>
      <Stack.Screen name="NewsDetail" component={NewsDetail}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
};
