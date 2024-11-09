import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommentForm from "../components/CommentForm";
import Posts from "../components/Posts";
import { auth, db } from "../firebase/config";

class Home extends Component {
    
    render() {
        const user = auth.currentUser;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pantalla Home de {user.userName}</Text>
            
                <CommentForm />
                <Text style={styles.title}>Publicaciones</Text>
                <Posts />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});

export default Home;

