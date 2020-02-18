import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';
import SplashComponent from './SplashComponent';
import HomeComponent from './HomeComponent';
import OptionsComponent from './OptionsComponent';
import AddMoneyComponent from './AddMoneyComponent';
import SendMoneyComponent from './SendMoneyComponent';
import ReceiveMoneyComponent from './ReceiveMoneyComponent';
const StackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignInScreen: {
      screen: SignInComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUpScreen: {
      screen: SignUpComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomeScreen: {
      screen: HomeComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    OptionsScreen: {
      screen: OptionsComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddMoneyScreen: {
      screen: AddMoneyComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    SendMoneyScreen: {
      screen: SendMoneyComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiveMoneyScreen: {
      screen: ReceiveMoneyComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'OptionsScreen',
  },
);

export default createAppContainer(StackNavigator);
