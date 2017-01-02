import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

var FB_PHOTO_WIDTH = 200;

class Photo extends Component {
  static contextTypes = {
    user: React.PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      photo: null,
    }
  }

  componentWillMount() {
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  }

  renderLoading() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  render(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>
        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  bottomBump: {
    marginBottom: 15,
  },
});

export default Photo
