import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableHighlight, ActivityIndicator } from 'react-native';

class Form extends Component {

  state = { name: null, phone_number: null, message: null, isLoading: false, errorMessage: null }

  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    this.setState({ isLoading: true }, () => {
      if (!this.state.name || 0 === this.state.name.length || !this.state.phone_number || 0 === this.state.phone_number.length) { //Example of form validation for two fields
        this.setState({ errorMessage: 'Vardo ir/arba Tel. nr.  laukeliai yra tušti!', isLoading: false })
      }
      else {
        fetch('https://TavoSvetaine.com/Method/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            phone_number: this.state.phone_number,
            message: this.state.message,
          }),
        })
          .then(() => {
            this.setState({ isLoading: false });
          })
          .catch(error => this.setState({ errorMessage: 'Atsiprašome, tačiau šiuo metu duomenų išsiųsti nepavyko. Klaida: ' + error, isLoading: false }));
      }
    });
  }

  onChange(phone_number) { // Ensures that all of the input that goes into the phone_number field is numeric only.
    newPhone = '';
    let numbers = '0123456789';
    for (var i = 0; i < phone_number.length; i++) {
      if (numbers.indexOf(phone_number[i]) > -1) {
        newPhone = newPhone + phone_number[i];
      }
    }
    this.setState({ phone_number: newPhone })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
        <View style={styles.inputSection}>
          <Image style={styles.icon} source={require('../img/user_icon.png')} />
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#FFFFFF"
            placeholder="Vardas"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.inputSection}>
          <Image style={styles.icon} source={require('../img/user_icon.png')} />
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#FFFFFF"
            placeholder="Tel. nr."
            keyboardType="numeric"
            onChangeText={phone_number => this.onChange(phone_number)}
            //onChangeText={phone_number => this.setState({ phone_number })}
            value={this.state.phone_number}
          />
        </View>
        <View style={styles.inputSection}>
          <Image style={styles.icon} source={require('../img/user_icon.png')} />
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#FFFFFF"
            placeholder="Žinutė"
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
          />
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="darkgray">
          {
            (() => {
              if (this.state.isLoading) return (
                <View style={styles.container}>
                  <ActivityIndicator size="large" />
                </View>
              )
              else return (
                <Text style={{ fontSize: 20, fontWeight: "500", letterSpacing: 1, color: '#FFFFFF' }}>SIŲSTI</Text>
              )
            })()
          }
        </TouchableHighlight>
        {this.state.errorMessage &&
          <Text style={{ color: 'red', textAlign: 'center', width: '90%', fontSize: 16, marginTop: 20 }}>
            {this.state.errorMessage}
          </Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginRight: -10
  },
  icon: {
    marginBottom: -5,
    marginRight: -40,
    width: 25,
    height: 25
  },
  textInput: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 55,
    height: 60,
    width: '75%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 40,
    color: '#FFFFFF',
    fontSize: 20
  },
  button: {
    marginTop: 15,
    height: 60,
    width: '75%',
    backgroundColor: 'gray',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // android shadow settings
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Form;