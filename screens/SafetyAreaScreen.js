import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const SafetyAreaScreen = () => {
  const [radius, setRadius] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  
  // Initially ask for location permission
  useState(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const handleSetSafetyArea = () => {
    if (radius && location) {
      // Set the radius around the current location or a specified location
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        {location && (
          <>
            <Marker coordinate={location} />
            <Circle
              center={location}
              radius={Number(radius)}
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeColor="red"
            />
          </>
        )}
      </MapView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
          placeholder="Enter radius in meters"
        />
        <Button title="Set Safety Area" onPress={handleSetSafetyArea} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
});

export default SafetyAreaScreen;