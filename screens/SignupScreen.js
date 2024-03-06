import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

function isValidEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function isValidPassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasLetter && hasDigit && password.length >= 6;
}

function submitSignupData(userData, navigation) {
  userData.name = userData.username;
  userData['email-register'] = userData.email;
  userData['password-register'] = userData.password;
  fetch('https://plamennikoleta.pythonanywhere.com/registrate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then(data => {
    if (data.success) {
      console.log('Success:', data);
      Alert.alert("Success", "Signup successful!");
      navigation.navigate('Login'); // Send to Login Screen when the user is registered
    } else if (data.error && data.error === "Email already exists") {
      console.log('Signup Error:', data.error);
      Alert.alert("Signup Error", data.error);
    } else {
      console.log('Unknown Error:', data);
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    Alert.alert("Network Error", "Signup failed! Please check your network connection and try again.");
  });
}

function SignupScreen( {navigation} ) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const validateFields = () => {
    const usernameValid = username.length >= 4 && username.length <= 20 && /^[a-zA-Z0-9]+$/.test(username);
    setUsernameValid(usernameValid);

    const emailValid = isValidEmail(email);
    setEmailValid(emailValid);

    const passwordValid = isValidPassword(password);
    setPasswordValid(passwordValid);

    const confirmPasswordValid = password === confirmPassword;
    setConfirmPasswordValid(confirmPasswordValid);

    return usernameValid && emailValid && passwordValid && confirmPasswordValid;
  };

  const handleSignup = () => {
    if (validateFields()) {
      const userData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword 
      };

      submitSignupData(userData, navigation);
    } else {
      Alert.alert("Error", "Please correct the errors before submitting.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>

      {/* Username Field */}
      <View style={[styles.inputWrapper, !isUsernameValid && styles.errorInputWrapper]}>
        <TextInput
          style={[styles.inputField, !isUsernameValid && styles.errorInput]}
          placeholder="Enter username"
          onChangeText={text => setUsername(text)}
          onBlur={() => setUsernameValid(username.length >= 4 && username.length <= 20 && /^[a-zA-Z0-9]+$/.test(username))}
          onFocus={() => setUsernameValid(true)}
          value={username}
        />
        {!isUsernameValid && (
          <TouchableOpacity onPress={() => showErrorMessage("Username must be 4-20 characters and alphanumeric.")}>
            <Icon name="info-outline" style={styles.infoButton} />
          </TouchableOpacity>
        )}
      </View>

      {/* Email Field */}
      <View style={[styles.inputWrapper, !isEmailValid && styles.errorInputWrapper]}>
        <TextInput
          style={[styles.inputField, !isEmailValid && styles.errorInput]}
          placeholder="Enter email address"
          onChangeText={text => setEmail(text)}
          onBlur={() => setEmailValid(isValidEmail(email))}
          onFocus={() => setEmailValid(true)}
          value={email}
        />
        {!isEmailValid && (
          <TouchableOpacity onPress={() => showErrorMessage("Enter a valid email address.")}>
            <Icon name="info-outline" style={styles.infoButton} />
          </TouchableOpacity>
        )}
      </View>

      {/* Password Field */}
      <View style={[styles.inputWrapper, !isPasswordValid && styles.errorInputWrapper]}>
        <TextInput
          style={[styles.inputField, !isPasswordValid && styles.errorInput]}
          placeholder="Create password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          onBlur={() => setPasswordValid(isValidPassword(password))}
          onFocus={() => setPasswordValid(true)}
          value={password}
        />
        {!isPasswordValid && (
          <TouchableOpacity onPress={() => showErrorMessage("Password must be at least 6 characters and must include at least one letter and one digit.")}>
            <Icon name="info-outline" style={styles.infoButton} />
          </TouchableOpacity>
        )}
      </View>

      {/* Confirm Password Field */}
      <View style={[styles.inputWrapper, !isConfirmPasswordValid && styles.errorInputWrapper]}>
        <TextInput
          style={[styles.inputField, !isConfirmPasswordValid && styles.errorInput]}
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
          onBlur={() => setConfirmPasswordValid(password === confirmPassword)}
          onFocus={() => setConfirmPasswordValid(true)}
          value={confirmPassword}
        />
        {!isConfirmPasswordValid && (
          <TouchableOpacity onPress={() => showErrorMessage("Passwords must match.")}>
            <Icon name="info-outline" style={styles.infoButton} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.otherMethodsText}>Other ways to register</Text>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  errorInputWrapper: {
    borderColor: 'red',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  clearButtonText: {
    color: 'red',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    color: '#5e1691', 
    textAlign: 'right',
    width: '100%',
    marginBottom: 25, 
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoButton: {
    color: 'red',
    fontSize: 36,
    marginLeft: -50,
    marginTop:-20,
  },
  welcomeText: {
    color: '#59189E',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30, 
  },
  inputField: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#a2a4b3',
    borderRadius: 20,
    padding: 15,
    color: '#333',
    backgroundColor: '#f0f0f0', 
    marginBottom: 20, 
    color:'black',
  },
  forgotPasswordText: {
    color: '#333', 
    textAlign: 'right',
    width: '100%',
    marginBottom: 25, 
  },
  loginButton: {
    backgroundColor: '#59189E', 
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
    width: 40, 
    height: 40,
    resizeMode: 'contain',
  },
});

export default SignupScreen;
