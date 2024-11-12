import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { db, auth } from "../firebase/config"

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            userName: "",
            error: ""

        }
    }


    register(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                if (response) {

                    db.collection("users").add({
                        userName: this.state.userName,
                        email: this.state.email,

                    })
                        .then(() => {
                            this.setState({ registered: true });
                            this.props.navigation.navigate('Login');
                        })
                        .catch(e => console.log("Error", e));

                }

            })
            .catch(error => {
                console.log(error.message);
                this.setState({ error: " Error: " + error.message });
            });

    }

    render() {

        return (
            <View>
                <Text >Registro</Text>

                <TextInput

                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}

                />

                <TextInput

                    keyboardType='default'
                    placeholder='User Name'
                    onChangeText={text => this.setState({ userName: text })}
                    value={this.state.userName}

                />

                <TextInput

                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}

                />

                <TouchableOpacity
                    onPress={() => this.register(this.state.email, this.state.password)}
                >
                    <Text>Registarse</Text>
                </TouchableOpacity>

                <Text>
                    {this.state.error}
                </Text>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text >Ya tengo cuenta</Text>
                </TouchableOpacity>


            </View>
        );
    }
}



