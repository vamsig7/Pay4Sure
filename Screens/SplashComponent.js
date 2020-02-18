import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class SplashComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            source={require('../assests/logo.png')}
            style={styles.logo}
            animation="wobble"
            duration={1500}
            resizeMode={'stretch'}
          />
        </View>

        <Animatable.View
          style={styles.footer}
          animation="bounceInUp"
          duration={1000}>
          <Text style={styles.title}>Pay Anywhere Anytime!</Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignInScreen')}>
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.signIn}>
                <Text style={styles.textSignIn}>Get Started</Text>
                <MaterialIcons name="skip-next" color="white" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
    marginTop: 15,
    fontSize: 20,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 50,
  },
  signIn: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSignIn: {
    fontSize: 15,
    alignContent: 'center',
    color: 'white',
  },
});
