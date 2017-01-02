import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SocialIcon } from 'react-native-elements'

class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  facebookDisplayText() {
    return (!this.context.isLoggedIn ? 'Log in with Facebook' : 'Log out')
  }

  render(){
    return (
      <View>
        <SocialIcon
          title={this.facebookDisplayText()}
          button
          style={{width: 220}}
          fontWeight='100'
          fontStyle={{fontSize: 16}}
          type='facebook'
          onPress={() => {
            if(!this.context.isLoggedIn) {
              this.context.login()
            } else {
              this.context.logout()
            }
          }}
          onLongPress={() => {
            if(!this.context.isLoggedIn) {
              this.context.login()
            } else {
              this.context.logout()
            }
          }}
        />
      </View>
    )
  }
}

export default FBLoginView
