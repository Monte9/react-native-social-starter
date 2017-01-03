import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get("window");

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import ProfileView from './ProfileView'

const background = require("./bg.jpg");

class LoginView extends Component {
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
    this.props.hideTabBar(true)
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.profileViewContainer}>
          { user && <ProfileView user={user} onLogout={this.onLogout.bind(this)} hideTabBar={this.props.hideTabBar}/> }
        </ScrollView>

        { !user && <View style={styles.facebookLoginContainer}>
          <Image source={background} style={styles.bgImage} >
            <FBLogin
              style={styles.loginButton}
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
          </Image>
        </View>}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e8ee'
  },
  bgImage: {
    width,
    height,
  },
  loginButton: {
    position: 'absolute',
    left: width / 2 - 80,
    top: height / 2 - 10,
  }
});

export default LoginView
