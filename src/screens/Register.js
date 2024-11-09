import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      bio: "",
      rememberMe: false,
      errorMsg: "",
    };
  }

  handleSubmit = () => {
    const { email, password, bio, userName } = this.state;
    if (email && password && userName) {
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
            .catch((e) => {
              console.error("Error al agregar el usuario a la base de datos: ", e.message);
              this.setState({ errorMsg: "Error al guardar en la base de datos" });
            });
          }
        })
        .catch((error) => {
          console.error("Error al crear el usuario: ", error.message);
          this.setState({ errorMsg: error.message });
        });
    } else {
      this.setState({ errorMsg: "Por favor, complete todos los campos" });
    }
  };

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  render() {
    const { navigation } = this.props;
    const { errorMsg, email, userName, password, bio, rememberMe } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pantalla de Registro</Text>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Usuario"
          onChangeText={text => this.setState({ userName: text })}
          value={userName}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Biografía"
          onChangeText={text => this.setState({ bio: text })}
          value={bio}
          multiline={true}
          numberOfLines={4}
        />
        <View style={styles.rememberMeContainer}>
          <Text>Recordarme</Text>
          <Switch
            value={rememberMe}
            onValueChange={this.toggleRememberMe}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
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
    marginTop: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Register;
