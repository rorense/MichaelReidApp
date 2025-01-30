import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import React from "react";

const OnboardingScreen= () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.textGroup}>
          <Text style={styles.text}>Welcome to your</Text>
          <Text style={styles.text}>art gallery</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
  },
  text: {
    color: '#7D1325',
    fontFamily: "DM Sans",
    fontSize: 36,
  },
  textGroup: {
    paddingTop: 100,
    paddingLeft: 20,
  }
})

export default OnboardingScreen;
