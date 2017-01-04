import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';

import { Tabs, Tab, Icon } from 'react-native-elements'

import LoginView from './app/LoginView'
import FeedView from './app/FeedView'

export default class SocialStarter extends Component {
  constructor () {
    super()
    this.state = {
      selectedTab: 'profile',
      hideTabBar: true,
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selectedTab) {
    this.setState({
      selectedTab
    })
  }

  hideTabBar(value) {
    this.setState({
      hideTabBar: value
    });
  }

  render () {
    const { toggleSideMenu } = this.props
    const { selectedTab } = this.state

    let tabBarStyle = {};
    let sceneStyle = {};
    if (this.state.hideTabBar) {
      tabBarStyle.height = 0;
      tabBarStyle.overflow = 'hidden';
      sceneStyle.paddingBottom = 0;
    }

    return (
      <Tabs hidesTabTouch tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}>
        <Tab
          selectedTitleStyle={{marginTop: -3, marginBottom: 7}}
          selected={selectedTab === 'feed'}
          title={selectedTab === 'feed' ? 'FEED' : null}
          renderIcon={() => <Icon color={'#5e6977'} name='whatshot' size={26} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='whatshot' size={26} />}
          onPress={() => this.changeTab('feed')}>
          <FeedView />
        </Tab>
        <Tab
          tabStyle={selectedTab !== 'profile' && { marginBottom: -6 }}
          selectedTitleStyle={{marginTop: -3, marginBottom: 7}}
          selected={selectedTab === 'profile'}
          title={selectedTab === 'profile' ? 'PROFILE' : null}
          renderIcon={() => <Icon style={{paddingBottom: 4}} color={'#5e6977'} name='important-devices' size={26} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='important-devices' size={26} />}
          onPress={() => this.changeTab('profile')}>
          <LoginView hideTabBar={this.hideTabBar.bind(this)} />
        </Tab>
      </Tabs>
    )
  }
}

styles = StyleSheet.create({
})

AppRegistry.registerComponent('SocialStarter', () => SocialStarter);
