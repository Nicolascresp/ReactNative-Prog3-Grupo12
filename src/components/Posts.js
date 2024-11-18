import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Touchable } from 'react-native';
import { db, auth } from "../firebase/config";
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            Like: false
        };
    }

    componentDidMount() {
        const currentUser = auth.currentUser;

        if (currentUser) {
            db.collection('posts')
                .where('email', '==', currentUser.email)
                .onSnapshot(docs => {
                    let arrayPosts = [];
                    docs.forEach(doc => {
                        arrayPosts.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    this.setState({
                        posts: arrayPosts,
                        loading: false,
                    }, () => console.log("Estado del componente con los datos de posts:", this.state.posts));
                });
        }
    }

    Like() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.userName)
        }).then(() => this.setState({
            Like: true
        }))
    }

    UnLike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.userName)
        }).then(() => this.setState({
            Like: false
        }))
    }

  
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <ActivityIndicator size="large" color="#0000ff" /> :
                    <FlatList
                        data={this.props.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.username}>{item.data.mensaje}</Text>}
                    />
                }

                {this.state.Like ? 
                <TouchableOpacity onPress={() => this.UnLike()}>
                    <Text>No me gusta</Text>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => this.Like()}>
                    <Text>Like</Text>
                </TouchableOpacity>
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    username: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Posts;
