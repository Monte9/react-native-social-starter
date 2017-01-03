import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView
} from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import ProfileView from './app/ProfileView'

export default class SocialStarter extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
    }
  }

  onLogout() {
    var _this = this;

    console.log("Logged out.");
    _this.setState({ user : null });
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <ScrollView style={styles.container}>

        { user && <ProfileView user={user} onLogout={this.onLogout.bind(this)}/> }
        <View style={styles.logoutContainer}>
          { !user &&
          <FBLogin
            style={{ marginBottom: 10, }}
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
          />}
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e8ee',
  },
  logoutContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
});

AppRegistry.registerComponent('SocialStarter', () => SocialStarter);
