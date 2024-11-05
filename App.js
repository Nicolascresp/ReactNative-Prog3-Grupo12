import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../PracticaUno - copia/src/screens/Login";
import Register from "../PracticaUno - copia/src/screens/Register";
import HomeMenu from "../PracticaUno - copia/src/components/HomeMenu";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}