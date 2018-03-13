import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from './components/Container';
import Header from './components/Text';
import { MainNavigator } from './config/routes';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
