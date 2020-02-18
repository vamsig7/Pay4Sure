import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import ButtonComponent from './ButtonComponent';
export default class HomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      encryptionKey: '',
      userId: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation="bounceInDown" style={styles.header}>
          <Text style={[styles.text_header, {flex: 1}]}>UserName</Text>
          <AntDesign
            name="logout"
            size={25}
            color="white"
            style={{paddingTop: 20}}
          />
        </Animatable.View>
        <View style={styles.footer}>
          <View style={styles.footer_center}>
            <ButtonComponent
              navigation={this.props.navigation}
              screenname={'AddMoneyScreen'}
            />
          </View>
          <View style={styles.footer_end}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OptionsScreen')}>
                <LinearGradient
                  colors={['#5db8fe', '#39cff2']}
                  style={styles.signIn}>
                  <MaterialIcons name="add" color="white" size={25} />
                  <Text style={styles.textSignIn}>Make Payment</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: 30,
    paddingBottom: 50,
    flexDirection: 'row',
  },
  footer: {
    flex: 7,
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
  footer_center: {
    flex: 5,
  },
  footer_end: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 50,
  },
  signIn: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSignIn: {
    fontSize: 17,
    alignContent: 'center',
    color: 'white',
  },
});
