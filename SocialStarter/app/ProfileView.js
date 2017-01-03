import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'

import { Text, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import settings_section from './sample_settings'

var FB_PHOTO_WIDTH = 200;

class ProfileView extends Component {
  static contextTypes = {
    user: React.PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      photo: null,
      info: null,
    }
  }

  componentWillMount() {
    this.fetchProfileImage()
    this.fetchUserDetails()

    this.props.hideTabBar(false)
  }

  fetchProfileImage() {
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

  fetchUserDetails() {
    var _this = this;
    var user = this.props.user;

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

  renderLoading() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderImage() {
    const { photo } = this.state

    if(photo) {
      return (
        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
              borderRadius: ( photo.width + photo.height ) / 4,
              flex: 1,
            }
          }
          source={{uri: photo && photo.url}}
        />
      )
    } else {
      return this.renderLoading();
    }
  }

  displayUserDetails() {
    const { info } = this.state

    if(info) {
      return (
        <View style={styles.userDetails}>
          <Text style={styles.headingName}>{info.name}</Text>
          <Text style={styles.headingTitle}>{info.email}</Text>
        </View>
      )
    } else {
      return this.renderLoading();
    }
  }

  render() {
    var _this = this;

    return (
      <View>
        <View style={styles.headingContainer}>
          {this.renderImage()}
          {this.displayUserDetails()}
        </View>
        <View style={styles.bodycontainer}>
          <List>
          {
            settings_section.map((item, index) => (
              <ListItem
                key={index}
                onPress={() => console.log("List item pressed")}
                title={item.title}
                icon={{name: item.icon}} />
            ))
          }
          </List>
          <List containerStyle={{marginBottom: 10}}>
            <ListItem
              key={1}
              hideChevron={true}
              onPress={() => FBLoginManager.logout((data) => {
                this.props.onLogout()
              })}
              title='LOGOUT'
              titleStyle={styles.logoutText}
              icon={{name: ''}} />
          </List>
        </View>
      </View>
    )
  }
}

const styles = {
  loadingContainer: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#e1e8ee',
  },
  headingContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6296f9'
  },
  bodycontainer: {
    flex: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    flex: 1,
  },
  userDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  headingName: {
    color: 'white',
    fontSize: 22
  },
  headingTitle: {
    color: '#43484d',
    fontSize: 17
  },
  logoutText: {
    color: 'red',
    textAlign: 'center',
  }
}

export default ProfileView
