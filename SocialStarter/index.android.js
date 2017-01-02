import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import FBLoginView from './app/FBLoginView'

import Photo from './app/Photo'
import Info from './app/Info'

export default class SocialStarter extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
    }
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.loginContainer}>

        { user && <Photo user={user} /> }
        { user && <Info user={user} /> }

        <FBLogin
          buttonView={<FBLoginView />}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />

        <Text>{ user ? user.token : "N/A user token" }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('SocialStarter', () => SocialStarter);
