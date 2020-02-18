import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
export default class ButtonComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(this.props.screenname)}>
          <Text>Add Money</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});
