import React from 'react';
import {AuthStack, RootStack} from './app';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <RootStack></RootStack>
    </NavigationContainer>
  );
};
