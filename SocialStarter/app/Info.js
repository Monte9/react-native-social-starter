import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Info extends Component {
  static contextTypes = {
    user: React.PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      info: null,
    }
  }

  componentWillMount() {
    var _this = this
    var user = this.props.user
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  }

  render() {
    var info = this.state.info

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  bottomBump: {
    marginBottom: 15,
  },
})

export default Info
