import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  onSubmit = () => {
    console.log("Comentario ingresado:", this.state.comment);
    this.setState({ comment: this.state.comment }); 
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Comentario"
          style={styles.input}
          onChangeText={text => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Comentario ingresado:</Text>
          <Text style={styles.previewComment}>{this.state.comment}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 5 },
  button: { backgroundColor: '#6200ea', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  previewContainer: { marginTop: 20 },
  previewText: { fontSize: 16, fontWeight: 'bold' },
  previewComment: { fontSize: 16, color: '#333', marginTop: 5 },
});

export default CommentForm;
