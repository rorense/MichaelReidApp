import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/image/Logo.png";

const SignInPage = () => {
	return (
		<SafeAreaView className="h-full bg-background">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Image source={require(".../assets/image/Logo.png")} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignInPage;
