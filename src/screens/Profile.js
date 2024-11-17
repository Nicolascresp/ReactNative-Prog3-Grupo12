import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { auth, db } from '../firebase/config'; 
import Posts from '../components/Posts';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: auth.currentUser ? auth.currentUser.email : "",
        user: "User",
        posts: [],
    };
}

componentDidMount() {
    auth.onAuthStateChanged(user => {
        if (!user) {
            this.props.navigation.navigate("Login");
        } else {
            db.collection("users")
             .where("email", "==", auth.currentUser.email)
             .onSnapshot(snapshot => {
                 if (!snapshot.empty) {
                      const doc = snapshot.docs[0];
                      this.setState({ user: doc.data().userName });
                    }
                });

   this.fetchPosts();

        }
    });}

    fetchPosts = () => {
      db.collection("posts")
      .where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
          let posts = querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          }));
          this.setState({ posts: posts });
      }, error => {
          console.error("Ha ocurrido un error");
      });
  }

  render() {
    const { navigation } = this.props;
    return (
    <>
        <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Desloguearse</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.mail}> Usuario: {this.state.email}</Text>
        <Text style={styles.cantidadPosteos}>Cantidad de posteos: {this.state.posts.length}</Text>
                {this.state.posts.length === 0 ? (
                    <View style={styles.cantidadPosteos}>
                        <Text>No hay ningun post subido</Text>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Posts post={item} condicion={true} />}
                    />
                )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  button: { backgroundColor: '#6200ea', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
  mail: {fontSize: 20 , color: 'blue'},
  cantidadPosteos: {fontSize: 20 , color: 'blue'},
});

export default Profile;

