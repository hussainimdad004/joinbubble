import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LIGHT_GRAY, ONYX_COLOR, PRIMARY_COLOR } from '../helpers/colors';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "janet.stevans@siliconrhino.io",
      password: "12345"
    }
  }
  render() {
    return (<View style={styles.container}>
      <Text style={styles.logo}>joinBubble</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          value={this.state.email}
          autoCorrect={false}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholderTextColor={ONYX_COLOR}
          onChangeText={text => this.setState({ email: text })} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          autoCorrect={false}
          value={this.state.password}
          autoCapitalize={'none'}
          placeholder="Password..."
          placeholderTextColor={ONYX_COLOR}
          onChangeText={text => this.setState({ password: text })} />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (this.state.email && this.state.password) {
            new WebApi().LoginUser(this.state.email, this.state.password).then(result => {
              if (result && result.data && result.data.token) {
                new MyStorage().setUserToken(result.data.token)
                this.props.navigation.navigate('Search')
              }
              console.log('Result LoginUser', result)
            }).catch(error => console.log('Error: ', error))
          }
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: PRIMARY_COLOR,
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: LIGHT_GRAY,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    // fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: ONYX_COLOR
  },
  loginBtn: {
    width: "80%",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    // fontFamily: 'Quicksand-Bold',
    fontSize: 16
  },
  singUpText: {
    color: PRIMARY_COLOR,
    // fontFamily: 'Quicksand-Bold',
    fontSize: 16
  }
});