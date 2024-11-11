import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { db, auth } from "../firebase/config";

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: ""
    };
  }

  handleSubmit = () => {
    const { mensaje } = this.state;
    const user = auth.currentUser;


    if (mensaje.trim() !== '') {
      db.collection('posts').add({
        mensaje: mensaje,
        owner: user.email,
        likes: [],
        createdAt: new Date(),
      })
      .then(() => {
        this.setState({ mensaje: '' });
      })
      .catch((error) => {
        console.error("Error al crear el post: ", error);
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje aquí..."
          value={this.state.mensaje}
          onChangeText={(text) => this.setState({ mensaje: text })}
          multiline
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Crear Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default NuevoPost;
