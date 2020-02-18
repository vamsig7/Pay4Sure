import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import qs from 'qs';
import Stripe from 'react-native-stripe-api';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {cos} from 'react-native-reanimated';
export default class AddMoneyComponent extends Component {
  constructor() {
    super();
    this.state = {
      cardNumber: '',
      exp_month: '',
      exp_year: '',
      cvv: '',
      auth_token: '',
      stripe_token: '',
      chargeAmount: 400,
    };
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_token');
      if (value !== null) {
        this.setState({auth_token: value});
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _changeCardValue(text) {
    var cardValue = this.state.cardNumber;

    if (text.length == 4) {
      cardValue += text;
    }

    this.setState({cardNumber: cardValue});
  }
  _stripeAsync = async (cardNumber, exp_month, exp_year, cvv) => {
    const client = new Stripe('pk_test_j6Naiagmvg7WSOrxY7jnd5ib00IXOGeqWN');
    try {
      const token = await client.createToken({
        number: cardNumber,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvv,
      });
      var stripe_token = token.id;
      this.setState({stripe_token: stripe_token});
    } catch (error) {
      console.log(error);
    }
  };
  _apiPayAsync = async () => {
    console.log(this.state.stripe_token);
    console.log(this.state.auth_token);
    fetch('http:/172.22.63.173:3000/api/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.state.auth_token,
      },
      body: qs.stringify({
        stripeToken: 'tok_1GCqR1CP8l93CCt00bVroQ1Z',
        chargeAmount: this.state.chargeAmount,
        modeOfPayment: 'stripe',
      }),
    })
      .then(response => console.log(response))

      .catch(err => console.log(err));
  };

  _onPayment = async () => {
    console.log('ello');
    var cardNumber = this.state.cardNumber;
    var exp_month = this.state.exp_month;
    var exp_year = this.state.exp_year;
    var cvv = this.state.cvv;
    await this._retrieveData();
    await this._stripeAsync(cardNumber, exp_month, exp_year, cvv);
    await this._apiPayAsync();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Enter the card Number</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="XXXX"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={text => {
              this._changeCardValue(text);
            }}
            style={{
              borderBottomColor: '#05375a',
            }}></TextInput>
          <TextInput
            placeholder="XXXX"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={text => {
              this._changeCardValue(text);
            }}
            style={{
              borderBottomColor: '#05375a',
            }}></TextInput>
          <TextInput
            placeholder="XXXX"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={text => {
              this._changeCardValue(text);
            }}
            style={{
              borderBottomColor: '#05375a',
            }}></TextInput>
          <TextInput
            placeholder="XXXX"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={text => {
              this._changeCardValue(text);
            }}
            style={{
              borderBottomColor: '#05375a',
            }}></TextInput>
        </View>
        <View style={styles.expiry}>
          <Text style={{paddingTop: 15}}>Enter the expiry Date : </Text>
          <TextInput
            placeholder="XX"
            maxLength={2}
            onChangeText={text => {
              this.setState({exp_month: text});
            }}
            keyboardType="number-pad"></TextInput>
          <Text style={{paddingTop: 15}}>:</Text>
          <TextInput
            placeholder="XX"
            onChangeText={text => {
              this.setState({exp_year: text});
            }}
            maxLength={2}
            keyboardType="number-pad"></TextInput>
        </View>
        <View style={styles.expiry}>
          <Text>Enter cvv</Text>
          <TextInput
            placeholder="XXX"
            onChangeText={text => {
              this.setState({cvv: text});
            }}
            maxLength={3}
            keyboardType="number-pad"></TextInput>
        </View>

        <TouchableOpacity onPress={() => this._onPayment()}>
          <View style={styles.button}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              <Text style={styles.textSignIn}>Proceed</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 20,
    paddingTop: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingRight: 10,
  },
  cardValue: {
    width: 150,
  },
  expiry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
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
