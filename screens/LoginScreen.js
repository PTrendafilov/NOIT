import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://plamennikoleta.pythonanywhere.com/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => {
      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check the content-type to ensure the response is in JSON format
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        const userToken = data.token;
        Alert.alert("Login Success", "You have successfully logged in!");
        navigation.navigate('Profile', { token: userToken });
      } else {
        Alert.alert("Login Failed", data.error || "Invalid login credentials");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Error", error.toString());
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Enter email address"
        placeholderTextColor="#9e9fa3"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.inputField}
        placeholder="Enter password"
        placeholderTextColor="#9e9fa3"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      
      <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Reset password functionality goes here.")}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      
      <Text style={styles.otherMethodsText}>Other ways to log in</Text>
      
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#59189E', // Changed to a darker color for better readability
    fontSize: 26, // Slightly larger for emphasis
    fontWeight: 'bold', // Added bold for emphasis
    marginBottom: 30, // Increased spacing
  },
  inputField: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#a2a4b3', // Lighter border color
    borderRadius: 20,
    padding: 15,
    color: '#333', // Dark text for readability
    backgroundColor: '#f0f0f0', // Lighter background for the field
    marginBottom: 20, // Increased spacing
    color:'black',
  },
  forgotPasswordText: {
    color: '#333', // Darker color for better visibility
    textAlign: 'right',
    width: '100%',
    marginBottom: 25, // Increased spacing
  },
  loginButton: {
    backgroundColor: '#59189E', // Changed color to match the theme
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  otherMethodsText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  socialButton: {
    padding: 10,
  },
  socialIcon: {
    width: 40, // Slightly larger for better visibility
    height: 40,
    resizeMode: 'contain',
  },
});

export default LoginScreen;