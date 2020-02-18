import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Spinner from 'react-native-spinkit';
import {
  initialize,
  isSuccessfulInitialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnPeersUpdates,
  connect,
  disconnect,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
} from 'react-native-wifi-p2p';
export default class SendMoneyComponent extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      isConnected: false,
      color: '',
    };
  }
  componentDidMount() {
    initialize();
    isSuccessfulInitialize().then(status => console.log(status));
    startDiscoveringPeers()
      .then(() => console.log('Sucessfull'))
      .catch(err => console.log(err));
    subscribeOnPeersUpdates(({devices}) => this.handleNewPeers(devices));
    subscribeOnConnectionInfoUpdates(this.handleNewInfo);
  }
  handleNewInfo = (info, sceondParam) => {
    console.log(64646776467, info);
  };
  connectDevice = item => {
    connect(item.deviceAddress)
      .then(() => {
        // unsubscribeFromPeersUpdates(event => console.log(event));
        // this.props.navigation
      })
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setState({color: color});
  }

  handleNewPeers = peers => {
    console.log(754862162442324, peers);
    this.setState({list: peers});
    this.getRandomColor();
  };
  render() {
    var color = this.state.color;
    const items = this.state.list.map(item => {
      return (
        <TouchableOpacity onPress={() => this.connectDevice(item)}>
          <View style={styles.deviceinfo}>
            <View style={[styles.circle, {backgroundColor: color}]}>
              <Text style={{color: 'white', fontSize: 21}}>
                {item.deviceName[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.devicetext}> {item.deviceName}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View style={[styles.container, {backgroundColor: this.state.color}]}>
        <View style={styles.loading}>
          <Spinner
            isVisible={true}
            type={'ChasingDots'}
            size={120}
            color={'#00000'}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.searchtext}>
            <Feather
              style={{paddingRight: 10}}
              name="search"
              color="#05375a"
              size={27}
            />
            <Text style={styles.headingtext}>Searching nearby devices....</Text>
          </View>
          {items}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 4,
    backgroundColor: 'white',
  },
  searchtext: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 20,
  },
  headingtext: {
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  deviceinfo: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  devicetext: {
    fontSize: 17,
    paddingLeft: 18,
    paddingTop: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',

    justifyContent: 'center',
  },
});
