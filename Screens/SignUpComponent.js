import React, {Component} from 'react';
import qs from 'qs';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {AsyncStorage} from 'react-native';
export default class SignInComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      reTypePassword: '',
      phoneNumber: '',
    };
  }
  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };
  getKeyFromApiAsync = async (email, phoneNumber, password) => {
    fetch('http://node-server-pay4sure.herokuapp.com/api/v1/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        username: email,
        password: password,
        mobile: phoneNumber,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        var encryptionKey = responseJson.encryptionKey;
        var userId = responseJson.userId;
        console.log('this is response');
        console.log(responseJson);

        this._storeData('encryptionKey', encryptionKey);
        this._storeData('useId', userId);
        this._storeData(JSON.stringify(email), password);
        this._storeData('balance', '0');
        this.props.navigation.navigate('SignInScreen');
      })
      .catch(err => console.log(err));
  };
  onSignUp = () => {
    var email = this.state.email;
    var phoneNumber = this.state.phoneNumber;
    var password = this.state.password;
    var reTypePassword = this.state.reTypePassword;
    if (email === '' || phoneNumber === '' || password === '')
      ToastAndroid.show("Is look you haven't filled all details");
    // else if (password !== reTypePassword) {
    //   ToastAndroid.show("It looks like passwords haven't matched");
    // }
    //api call
    this.getKeyFromApiAsync(email, phoneNumber, password);
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
          <Text style={(styles.text_footer, {marginTop: 35})}>
            Phone number
          </Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={25} />
            <TextInput
              placeholder="Your Phone number"
              style={styles.textInput}
              onChangeText={text => {
                this.setState({phoneNumber: text});
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
          <Text style={(styles.text_footer, {marginTop: 35})}></Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Re-enter password.."
              style={styles.textInput}
              keyboardType={'number-pad'}
              maxLength={4}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({reTypePassword: text});
              }}
            />
            <Feather name="eye-off" color="gray" size={20} />
          </View>

          <TouchableOpacity onPress={this.onSignUp}>
            <View style={styles.button}>
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.signIn}>
                <Text style={styles.textSignIn}>Sign Up</Text>
              </LinearGradient>
            </View>
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
