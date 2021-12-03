import React, {useEffect, useState} from 'react';
import LogIn from '../../screens/login';
import Register from '../../screens/register';
import Home from '../../screens/home';
import Profile from '../../screens/profile';
import EditProfile from '../../screens/editProfile';
import ChangePassword from '../../screens/changePassword';
import AllProducts from '../../screens/allProducts';
import ProductDetail from '../../screens/productDetail';
import Cart from '../../screens/cart';
import UserManage from '../../screens/userManage';
import AsyncStorage from '@react-native-community/async-storage';
import {IconFill} from '@ant-design/icons-react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const drawerStack = {
  Home: {
    screen: Home,
    options: {
      title: 'Home',
      drawerIcon: ({focused}) => (
        <IconFill
          name="home"
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
  Cart: {
    screen: Cart,
    options: {
      title: 'Cart',
      drawerIcon: ({focused}) => (
        <IconFill
          name="shopping"
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
    console.log(role);
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
      {role === 'Manager' ? (
        <Drawer.Screen
          name={'User Manager'}
          component={UserManage}
          options={{
            title: 'User manager',
            drawerIcon: ({focused}) => (
              <IconFill
                name="folder"
                size={20}
                color={focused ? '#39D5D5' : 'black'}></IconFill>
            ),
          }}></Drawer.Screen>
      ) : null}
    </Drawer.Navigator>
  );
};

const appScreen = {
  Home: {
    screen: DrawerNavigation,
    options: {
      title: 'Home',
    },
  },
  Profile: {
    screen: Profile,
    options: {
      title: 'Profile',
    },
  },
  EditProfile: {
    screen: EditProfile,
    options: {
      title: 'EditProfile',
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    options: {
      title: 'ChangePassword',
    },
  },
  AllProducts: {
    screen: AllProducts,
    options: {
      title: 'AllProducts',
    },
  },
  ProductDetail: {
    screen: ProductDetail,
    options: {
      title: 'ProductDetail',
    },
  },
};

const authScreen = {
  LogIn: {
    screen: LogIn,
    options: {
      title: 'LogIn',
    },
  },
  Register: {
    screen: Register,
    options: {
      title: 'Register',
    },
  },
};

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
};

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
    </Stack.Navigator>
  );
};
