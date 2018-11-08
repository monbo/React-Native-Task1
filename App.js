import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Tabs } from './Nav.js';

// This is a know issue with react-native, expect fixes soon.
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

export default class App extends Component {
  render() {
    return (
      <Tabs />
    );
  }
}
