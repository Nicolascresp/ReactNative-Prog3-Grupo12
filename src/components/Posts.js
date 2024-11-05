import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { db, auth } from "../firebase/config";

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
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

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? 
                    <ActivityIndicator size="large" color="#0000ff" /> : 
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.username}>{item.data.mensaje}</Text>}
                    />
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
