import React, {useEffect, useMemo, useReducer, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack, RootStack} from '../../navigation/app';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../stores';

const App = () => {
  const initialLoginState = {
    token: '',
  };

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return {
          token: action.payload,
        };
      }
      case 'LOGOUT': {
        return {
          token: null,
        };
      }
      default:
        return state;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: token => {
        dispatch({type: 'LOGIN', payload: token});
      },
      signOut: async () => {
        dispatch({type: 'LOGOUT'});
        const value = JSON.parse(await AsyncStorage.getItem('cart'));
        let id = await AsyncStorage.getItem('id');
        let token = await AsyncStorage.getItem('token');
        let productDetail = [];
        if (value) {
          for (var i = 0; i < value.length; i++) {
            let detail = {
              product: value[i].id_product,
              quantity: value[i].quantity,
              price: value[i].price,
              productThumbnail: value[i].image,
              name: value[i].name,
            };
            productDetail.push(detail);
          }
        }
        try {
          await fetch('https://dutsenior.herokuapp.com/api/users/' + id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              cartDetail: productDetail,
            }),
          }).then(response => response.json());
        } catch (err) {
          console.log('Loi');
        }
        await AsyncStorage.clear();
      },
    }),
    [],
  );

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    token
      ? dispatch({type: 'LOGIN', payload: token})
      : dispatch({type: 'LOGOUT'});
  };
  useEffect(() => {
    getToken();
    return () => {};
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.token ? <RootStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
