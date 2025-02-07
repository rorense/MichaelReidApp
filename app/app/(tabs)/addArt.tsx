import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";

const AddArt = () => {
	const [step, setStep] = useState(1);

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background h-full">
				<View className="w-full justify-center items-center min-h-[85h] flex">
					<Text className="text-center font-DMSans text-4xl top-10">Add Art</Text>
					<Text className="text-center font-DMSans text-2xl mt-10">Add Art</Text>
				</View>
			</SafeAreaView>
		</>
	);
};

export default AddArt;
