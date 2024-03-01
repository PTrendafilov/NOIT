import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants'; // Import Constants

const LocationScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    locateCurrentPosition();
  };

  const locateCurrentPosition = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error(error);
      setErrorMsg('Could not fetch location');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      requestLocationPermission();
    }
  }, []);

  return (
    <View style={styles.container}>
      {currentPosition ? (
        <MapView style={styles.map} initialRegion={currentPosition}>
          <Marker coordinate={currentPosition} />
          {/* You can add more markers here to show the location of other devices */}
        </MapView>
      ) : (
        <Text>{errorMsg || 'Waiting for location...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocationScreen;
