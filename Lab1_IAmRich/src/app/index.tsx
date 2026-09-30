import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>I am Rich</Text>
        <Image 
          source={require('../../assets/images/diamond.jpg')} 
          style={styles.diamondImage} 
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#81BFDA',
    marginBottom: 180,
  },
  diamondImage: {
    width: 300,
    height: 300,
  },
});

export default Home;