import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ loggedIn: true });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ error: "Credenciales no existentes" });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>

        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text>{this.state.error}</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.registerLink}>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  registerLink: {
    color: '#1E90FF',
    marginTop: 20,
    fontSize: 16,
  },
});
