import { Text, View, TouchableOpacity, SafeAreaView, Image, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";

const OnboardingScreen = () => {
	const [step, setStep] = useState(1);
	const fadeAnim1 = useState(new Animated.Value(1))[0];
	const fadeAnim2 = useState(new Animated.Value(0))[0];
	const fadeAnim3 = useState(new Animated.Value(0))[0];
	const buttonAnim = useState(new Animated.Value(1))[0];

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim1, {
				toValue: step >= 1 ? (step > 1 ? 0.3 : 1) : 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim2, {
				toValue: step >= 2 ? (step > 2 ? 0.3 : 1) : 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim3, {
				toValue: step >= 3 ? 1 : 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();
	}, [step]);

	const handleNext = () => {
		if (step < 3) setStep((prev) => prev + 1);
	};

	return (
		<SafeAreaView className="flex-1 bg-[#FFFBF6]">
			<Image
				source={require("../assets/image/Logo.png")}
				style={{ width: 100, height: 100 }}
				className="mt-10 ml-10"
			/>

			<View className="flex-1 px-5 mt-8">
				{/* Text Content with Separated Lines */}
				<View className="flex-1">
					<Animated.View style={{ opacity: fadeAnim1 }}>
						<Text className="text-primary font-DMSans text-2xl">Welcome to your</Text>
						<Text className="text-primary font-DMSans text-2xl">art gallery</Text>
					</Animated.View>

					<Animated.View style={{ opacity: fadeAnim2, marginTop: 20 }}>
						<Text className="text-primary font-DMSans text-2xl">Keep your art</Text>
						<Text className="text-primary font-DMSans text-2xl">collection at hand</Text>
					</Animated.View>

					<Animated.View style={{ opacity: fadeAnim3, marginTop: 20 }}>
						<Text className="text-primary font-DMSans text-2xl">Take photographs, or use</Text>
						<Text className="text-primary font-DMSans text-2xl">images sent to you via email, to</Text>
						<Text className="text-primary font-DMSans text-2xl">add artworks to your collection</Text>
					</Animated.View>
				</View>

				{/* Fixed Position Controls */}
				<View className="absolute bottom-20 w-full items-center">
					{step < 3 ? (
						<Animated.View style={{ opacity: buttonAnim }}>
							<TouchableOpacity
								onPress={handleNext}
								className="w-20 h-20 rounded-full bg-primary items-center justify-center">
								<Text className="text-white text-4xl">→</Text>
							</TouchableOpacity>
						</Animated.View>
					) : (
						<View className="w-full items-center gap-y-4">
							<Link
								href="/sign-up"
								className="w-[70%] bg-primary py-4 rounded-full items-center">
								<Text className="text-white font-DMSans text-lg text-center">Sign Up</Text>
							</Link>
							<Link
								href="/sign-in"
								className="w-[70%] border-2 border-primary py-4 rounded-full items-center">
								<Text className="text-primary font-DMSans text-lg text-center">Login</Text>
							</Link>
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingScreen;
