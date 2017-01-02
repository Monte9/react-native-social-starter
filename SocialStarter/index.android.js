import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

import {
  SocialIcon
} from 'react-native-elements'

export default class SocialStarter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SocialIcon
          title='Sign In With Facebook'
          button
          style={{width: 220}}
          type='facebook'
          onPress={() => {
            Alert.alert('Login', 'Facebook login here.');
          }}
          onLongPress={() => {
            Alert.alert('Login', 'Long Press Facebook login.');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('SocialStarter', () => SocialStarter);
