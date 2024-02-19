import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            navigation.replace('login');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    return (
        <View>
        <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default LogoutButton;
