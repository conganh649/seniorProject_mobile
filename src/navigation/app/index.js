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
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import OrderDetail from '../../screens/orderDetail';
import FamilyDetail from '../../screens/familyDetail';
import Loading from '../../screens/loading';
const Drawer = createDrawerNavigator();

const splashScreen = {
  splash: {
    screen: Loading,
    options: {
      header: () => {},
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    },
  },
};

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

const authScreen = {
  LogIn: {
    screen: LogIn,
    options: {
      title: 'LogIn',
      header: () => {},
    },
  },
  Register: {
    screen: Register,
    options: {
      title: 'Register',
      header: () => {},
    },
  },
};

const appScreen = {
  Home: {
    screen: DrawerNavigation,
    options: {
      title: 'Home',
      header: () => {},
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

  OrderDetail: {
    screen: OrderDetail,
    options: {
      title: 'OrderDetail',
    },
  },

  FamilyDetail: {
    screen: FamilyDetail,
    options: {
      title: 'FamilyDetail',
    },
  },
  CulturalFamily: {
    screen: CulturalFamily,
    options: {
      title: 'CulturalFamily',
    },
  },
  Military: {
    screen: Military,
    options: {
      title: 'Military',
    },
  },
  News: {
    screen: News,
    options: {
      title: 'News',
    },
  },
  NewsDetail: {
    screen: NewsDetail,
    options: {
      title: 'NewsDetail',
    },
  },
};

const configSwitchScreen = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({
        ...appScreen,
      }).map(([name, component]) => {
        return (
          <Stack.Screen
            key={name}
            name={name}
            component={component.screen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              ...component.options,
            }}></Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  const [isLoadApp, setIsLoadApp] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadApp(false);
    }, 2000);
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({
        ...(isLoadApp ? splashScreen : authScreen),
      }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component.screen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            ...component.options,
          }}></Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};
