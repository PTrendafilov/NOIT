import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; // Your LoginScreen component
import SignupScreen from './screens/SignupScreen'; // Your LoginScreen component
import { StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen';
import SafetyAreaScreen from './screens/SafetyAreaScreen';
// Placeholder components for LoginScreen and SignupScreen
// You'll replace these with your actual screen components once they're created


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#59189E',
          },
          headerTintColor: '#fff', 
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen 
          name="Location" 
          component={LocationScreen}
          options={{ title: 'Location' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// This is your current home screen with the buttons
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/background1.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>GPS Protection</Text>
        </View>

        <StatusBar style="auto" />

        {/* Login and Signup buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')} // Navigate to Login screen when pressed
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Signup')} // Navigate to Signup screen when pressed
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 200, 
    justifyContent: 'center', // Centers content vertically within header
    alignItems: 'center', // Centers content horizontally within header
    marginTop: StatusBar.currentHeight || 0,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 30,
  },
  loginButton: {
    backgroundColor: '#59189E',
    paddingVertical: 10,
    borderRadius: 30,
    width: '80%',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#59189E',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default App;