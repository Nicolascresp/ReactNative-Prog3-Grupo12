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
        
        <View style={styles.header}>
                <Text style={styles.profile}>Mi Perfil</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

        <View style={styles.infoUsuario}>
        <Text style={styles.mail}> Usuario: {this.state.user} </Text>
        <Text style={styles.mail}> Email: {this.state.email} </Text>
        <Text style={styles.cantidadPosteos}>Cantidad de posteos: {this.state.posts.length}</Text>
        </View>
                {this.state.posts.length === 0 ? (
                    <View style={styles.ceroPosteos}>
                        <Text style={styles.textoCeroPosteos}>No hay ningún post subido</Text>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Posts posts={[item]} condicion={true} />}
                    />
                )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f8f9fa' },
  profile: { fontSize: 25, marginBottom: 20 , fontWeight: 'bold', textAlign: 'center', flex: 1},
  logoutButton: { backgroundColor: '#6200ea', padding: 10, borderRadius: 5 },
  logoutText: {color: 'white', fontSize: 16, fontWeight: 'bold'} ,
  mail: {fontSize: 20 , color: 'blue'},
  cantidadPosteos: {fontSize: 20 , color: 'blue', marginTop: 5},
  infoUsuario: {alignSelf: 'flex-start', padding: 10,},
ceroPosteos: {flex: 1, justifyContent: 'center', alignItems: 'center',},
textoCeroPosteos: { fontSize: 16,color: 'gray',},
});

export default Profile;

