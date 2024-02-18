import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Svg, { SvgUri } from 'react-native-svg';
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      
      <TextInput
  style={styles.inputField}
  placeholder="Enter email address"
  placeholderTextColor="#9e9fa3" // Set placeholder text color to white
  keyboardType="email-address"
  textContentType="emailAddress" // only for iOS
/>

<TextInput
  style={styles.inputField}
  placeholder="Enter password"
  placeholderTextColor="#9e9fa3"
  secureTextEntry
  textContentType="password" // only for iOS
/>
      
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.loginButton}>
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