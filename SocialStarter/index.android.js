import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

import { SocialIcon } from 'react-native-elements'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import FBLoginView from './app/FBLoginView'

export default class SocialStarter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FBLogin
          buttonView={<FBLoginView />}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email","user_friends"]}
          onLogin={function(e){console.log(e)}}
          onLoginFound={function(e){console.log(e)}}
          onLoginNotFound={function(e){console.log(e)}}
          onLogout={function(e){console.log(e)}}
          onCancel={function(e){console.log(e)}}
          onPermissionsMissing={function(e){console.log(e)}}
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
