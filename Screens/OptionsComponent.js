import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import wifi from 'react-native-android-wifi';
import {PermissionsAndroid} from 'react-native';
export default class OptionsComponent extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
  }
  _getPermisssions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  _turnWifiOn = async () => {
    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        console.log('wifi service enabled');
      } else {
        wifi.setEnabled(true);
        this.setState({disabled: false});
      }
    });
  };
  componentDidMount() {
    this._getPermisssions();
    this._turnWifiOn();
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SendMoneyScreen')}>
          <View style={styles.button}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              <Text style={styles.textSignIn}>Send Money</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ReceiveMoneyScreen')}
          style={[
            styles.signIn,
            {
              borderColor: '#4dc2f8',
              borderWidth: 1,
              marginTop: 15,
            },
          ]}>
          <Text
            style={
              ([styles.textSignIn],
              {
                color: '#4dc2f8',
              })
            }>
            Receive Money
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 4,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textSignIn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
