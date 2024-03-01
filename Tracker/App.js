import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList, PermissionsAndroid, Platform, NativeEventEmitter, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationScreen from './LocationScreen';
import BleManager from 'react-native-ble-manager';

console.log(NativeModules.BleManager); // This should not be undefined or null
const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

const handleDiscoverPeripheral = (peripheral) => {
  if (peripheral.name && peripheral.name.includes('iTAG')) {
    setDevices((prevDevices) => {
      // Prevent duplicate devices
      if (prevDevices.some(device => device.id === peripheral.id)) {
        return prevDevices;
      }
      return [...prevDevices, peripheral];
    });
  }
};
bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

// Request permission function for Android
const requestPermissions = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }
};
const DeviceCard = () => {
  return (
    <View style={styles.deviceCard}>
      <Image source={require('./assets/logo.png')} style={styles.deviceImage} />
      <Text style={styles.deviceTitle}>iTAG</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


/*const DeviceScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>Device</Text>
      <DeviceCard />
    </View>
  );
};*/
const DeviceScreen = () => {
  const [devices, setDevices] = useState([]);

  // Define the function to handle discovered peripherals
  const handleDiscoverPeripheral = (peripheral) => {
    if (peripheral.name && peripheral.name.includes('iTAG')) {
      setDevices((prevDevices) => {
        // Prevent duplicate devices
        if (prevDevices.some(device => device.id === peripheral.id)) {
          return prevDevices;
        }
        return [...prevDevices, peripheral];
      });
    }
  };

  // Define the function to start scanning
  const startScan = () => {
    BleManager.scan([], 5, true).then(() => {
      console.log('Scanning...');
    }).catch((err) => {
      console.error('Scan error', err);
    });
  };

  useEffect(() => {
    // Initialize the BleManager
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('Module initialized');
        // Request permissions after initialization
        return requestPermissions();
      })
      .then(() => {
        // Start scanning only after permissions are granted
        startScan();
      })
      .catch((error) => {
        console.error('Initialization error', error);
      });

    // Add event listener for discovered devices
    const subscription = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral
    );

    // Return the cleanup function
    return () => {
      // Stop the scanner just in case it was left on
      BleManager.stopScan().catch((error) => {
        console.error('Stop scan error', error);
      });
      // Remove the event listener
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.deviceCard}>
            <Text style={styles.deviceTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const CameraScreen = () => <View />;

const SettingsScreen = () => <View />;

const Tab = createBottomTabNavigator()



const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Device</Text>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Device':
                  iconName = 'bluetooth';
                  break;
                case 'Camera':
                  iconName = 'camera';
                  break;
                case 'Location':
                  iconName = 'location';
                  break;
                case 'Settings':
                  iconName = 'settings';
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Device" component={DeviceScreen} />
          <Tab.Screen name="Camera" component={CameraScreen} />
          <Tab.Screen name="Location" component={LocationScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  },
  deviceCard: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceImage: {
    width: 100,
    height: 100,
  },

  button: {
    padding: 10,
  },

  buttonsContainer: {
    flexDirection: 'column',
  },
});

export default App;