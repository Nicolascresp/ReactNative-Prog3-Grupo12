import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";

class Usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let arrayUser = [];
            docs.forEach(doc => {
                arrayUser.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                users: arrayUser,
                loading: false,
            }, ()=>console.log("Estado del componente con los datos de usuarios:", this.state.users, arrayUser));
            
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : <FlatList
                    data={this.state.users}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.username}>{item.data.userName}</Text>}
                />}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    username: {
        fontSize: 16,
    },
});

export default Usuarios;
