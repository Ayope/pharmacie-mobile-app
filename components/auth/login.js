import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import validatePassword from "../utils/passwordValidation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleRegisterPress = () => {
        navigation.navigate('register');
    };

    const validateFields = () => {
        let errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email";
        }

        // if (!validatePassword(password)) {
        //     errors.password = "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
        // }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateFields()) {
            return;
        }
        
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await AsyncStorage.setItem('isLoggedIn', 'true');
            navigation.replace('home');
            
        } catch (error) {
            console.error("Error logging in user: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/pharmacie-logo.png')} style={{height:210, width:210}}/>
            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button title="Login" onPress={handleLogin} />

            <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap : 20
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        width : '75%',
        color: 'red',
    },      
});

export default LoginForm;
