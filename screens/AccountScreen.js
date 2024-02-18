import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen= ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileInfos}>
        <View style={styles.image}></View>
        <View style={styles.parentData}>
        <Text style={styles.heading}>Name Surname</Text>
        <Text body>johndaun@gmail.com</Text>
        </View>
     </View>
     <View style={styles.notifications}>
        <Button title="Notifications" color='#f0f0f0' onPress={() => navigation.navigate('Notifications')}></Button>
     </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  profileInfos: {
    marginTop: 20,
    paddingHorizontal: 29,

  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
  },
  parentData:{
    marginTop: -80,
    marginLeft: 150,

  },
  notifications:{
    marginTop: 50,
    border: 0,



  },
});

export default AccountScreen;

