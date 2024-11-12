import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth } from '../firebase/config';


export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }


  login(email,password){
    auth.signInWithEmailAndPassword(email,password)
    .then(response => {
      this.setState({loggedIn : true})
    })
    .catch(error => {
      console.log(error.message); 
      this.setState({ error: "Credenciales Invalidas: " + error.message });
   });
   
  }


  render() {
    return (
      <View>
        <Text>Ingresar</Text>

                <TextInput 

                  keyboardType='email-address'
                  placeholder='email'
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}

                />

                <TextInput 

                  keyboardType='default'
                  placeholder='password'
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.password}

                />


        <TouchableOpacity
          onPress={() => {
            this.login(this.state.email, this.state.password);
            this.props.navigation.navigate("HomeMenu");
          }}          
        >
          <Text>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

