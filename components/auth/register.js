import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import validatePassword from "../utils/passwordValidation"

const RegistrationForm = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLoginPress = () => {
    navigation.navigate('login');
  };

  const validateFields = () => {
    let errors = {};
  
    if (firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters';
    }
  
    if (lastName.length < 3) {
      errors.lastName = 'Last name must be at least 3 characters';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email';
    }
  
    if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
    }
  
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }  

    const auth = getAuth();
    const db = getFirestore();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(db, 'Users', user.uid), {
        firstName,
        lastName,
      }); 

      navigation.replace('login')
    
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/pharmacie-logo.png')} style={{height:210, width:210}}/>
      <TextInput
        style={[styles.input, errors.firstName && styles.errorInput]}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        style={[styles.input, errors.lastName && styles.errorInput]}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity onPress={handleLoginPress}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap : 20
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    // marginBottom: 10,
  },  
});

export default RegistrationForm;
