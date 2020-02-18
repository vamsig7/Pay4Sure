import React, {Component} from 'react';
import qs from 'qs';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';
export default class SignInComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async (key, password) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (value === password) {
          console.log('logged in through this');
          this.props.navigation.navigate('HomeScreen');
        } else ToastAndroid.show('Incorrect password');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // 'http://node-server-pay4sure.herokuapp.com/api/v1/login',
  getKeyFromApiAsync = async (email, password) => {
    fetch('http://172.22.63.173:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        username: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.status);
        if (responseJson.status == 200) {
          var encryptionKey = responseJson.encryptionKey;
          var userId = responseJson.userId;
          var auth_token = responseJson.token;
          this._storeData('encryptionKey', encryptionKey);
          this._storeData('useId', userId);
          this._storeData(JSON.stringify(email), password);
          this._storeData('auth_token', auth_token);
          this.props.navigation.navigate('HomeScreen');
        }
      })
      .catch(err => console.log(err));
  };
  onSignIn = () => {
    var email = this.state.email;
    var password = this.state.password;

    if (email === '' || password === '')
      ToastAndroid.show("Is look you haven't filled all details");
    else {
      if (this._retrieveData(JSON.stringify(email), password))
        this.getKeyFromApiAsync(email, password);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome There!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={25} />
            <TextInput
              placeholder="Your Email...."
              style={styles.textInput}
              onChangeText={text => {
                this.setState({email: text});
              }}
            />
            <Feather name="check-circle" color="green" size={20} />
          </View>
          <Text style={(styles.text_footer, {marginTop: 35})}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your password"
              style={styles.textInput}
              keyboardType={'number-pad'}
              maxLength={4}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({password: text});
              }}
            />
            <Feather name="eye-off" color="gray" size={20} />
          </View>
          <Text
            style={{
              color: '#009bd1',
              paddingVertical: 10,
              fontSize: 15,
            }}>
            Forgot password?
          </Text>
          <TouchableOpacity onPress={this.onSignIn}>
            <View style={styles.button}>
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.signIn}>
                <Text style={styles.textSignIn}>Sign In</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: '#009bd1',
              paddingVertical: 10,
              fontSize: 15,
            }}>
            Dont have acount ?
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
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
              SignUP
            </Text>
          </TouchableOpacity>
        </View>
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
