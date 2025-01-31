import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Button, Alert } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Link } from "expo-router";

const OnboardingScreen= () => {
  return (
    <SafeAreaView className="flex-1 flex bg-[#FFFBF6]">
      <Image
        source={require('../assets/image/Logo.png')}
        style={{ width: 100, height: 100 }}
        className="mt-10 ml-10"
      />
        <View className="mt-[100px] pl-5">
          <Text className="text-[#7D1325] text-4xl">Welcome to your</Text>
          <Text className="text-[#7D1325] text-4xl">art gallery</Text>
          <TouchableOpacity className="w-[200px] mt-[200px] mx-[auto] my-0">
            <Button 
              title="Get Started"
              onPress={() => Alert.alert('Simple Button Pressed')}
              color="#7D1325"
            />
          </TouchableOpacity>
          <Link className="text-center" href="/profile">Go to Profile</Link>
        </View>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
