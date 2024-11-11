import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import { auth } from "../firebase/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
    };
  }

  handleSubmit(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(error => this.setState({ errorMsg: error.message }));
  }
  
componentDidMount(){
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.props.navigation.navigate("HomeMenu")
    }
  })
}
  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pantalla de Login</Text>
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
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <View style={styles.rememberMeContainer}>
          <Text>Recordarme</Text>
          <Switch
            value={this.state.rememberMe}
            onValueChange={this.toggleRememberMe}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Ir al Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  field: { width: '80%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#6200ea', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  linkButton: { marginTop: 10 },
  linkText: { color: '#6200ea', fontSize: 16 },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
});

export default Login;
