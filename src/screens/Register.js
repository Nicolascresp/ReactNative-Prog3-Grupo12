import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from "../firebase/config";
import {Login} from "../screens/Login"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      rememberMe: false,
      errorMsg: "",
    };
  }

  handleSubmit(email, password, bio, userName) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          
          db.collection("users").add({
            mail: email,
            bio: bio,
            userName: userName,
          })
          .then(() => {
       
            this.props.navigation.navigate("Login");
          })
          .catch((e) => console.log(e.message));
  
         
          this.setState({ registered: true, errMsg: "" });
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errMsg: error.message });
      });
  }
  

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pantalla de Registro</Text>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="User"
          onChangeText={text => this.setState({ user: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Bio"
          onChangeText={text => this.setState({ bio: text })}
          value={this.state.bio}
          multiline = {true}
          numerOfLines = {4}
        />
        <View style={styles.rememberMeContainer}>
          <Text>Recordarme</Text>
          <Switch
            value={this.state.rememberMe}
            onValueChange={this.toggleRememberMe}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.bio, this.state.userName)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.error}>
          { this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}
        </Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Ir al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  field: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
  },
  error: {
    color: "red",
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Register;
