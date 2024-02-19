import React from 'react';
import { ScrollView, View } from 'react-native';
import RegistrationForm from './components/auth/register';
import  { initializeApp } from 'firebase/app';
import LoginForm from './components/auth/login';
import PharmacyList from './components/pharmacy/pharmaciesList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const firebaseConfig = {
  apiKey: "AIzaSyBx2yNJKhZT2MMmwZy12wAmzmQBSdz1x3I",
  authDomain: "authentication-pharmacie.firebaseapp.com",
  projectId: "authentication-pharmacie",
  storageBucket: "authentication-pharmacie.appspot.com",
  messagingSenderId: "198675792988",
  appId: "1:198675792988:web:3aa0261775d25bd88bd299",
  measurementId: "G-W0NCX6S1C2"
};

initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="home" component={PharmacyList} />
        <Stack.Screen name="login" component={LoginForm} />
        <Stack.Screen name="register" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
