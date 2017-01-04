import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Card, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get("window");

import posts from './sample_posts'

class FeedView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Social Feed</Text>
        </View>
        <ScrollView style={{backgroundColor: '#e1e8ee', paddingBottom: 100}}>
          <View style={styles.container}>
            {
              posts.map((post, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => console.log("pressed")}
                    activeOpacity={1}
                    key={index}>
                    <Card
                      title={post.title}
                      image={{uri: post.post_uri}}
                      containerStyle={{backgroundColor: '#bdc6cf'}}
                      onPress={() => console.log("pressed")}>
                      <Text style={{marginBottom: 10}}>
                        {post.post_text}
                      </Text>
                      <Button
                        icon={{name: 'eye', type: 'font-awesome', color:'white'}}
                        backgroundColor={'#6296f9'}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Explore'
                        onPress={() => console.log("pressed")}/>
                    </Card>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  user: {
    flexDirection: 'row',
    marginBottom: 6
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  name: {
    fontSize: 16,
    marginTop: 5
  },
  header: {
    flex: 0.1,
    backgroundColor: 'white',
    width: width,
    height: 64
  },
  headerTitle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#6296f9',
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 18
  }
}

export default FeedView
