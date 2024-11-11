import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import home from "../screens/home" ;
import Profile from '../screens/Profile';
import NuevoPost from "../screens/NuevoPost";
import UsuariosSearch from "../components/UsuariosSearch"

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Users"
          component={UsuariosSearch}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Create Post"
          component={NuevoPost}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;
