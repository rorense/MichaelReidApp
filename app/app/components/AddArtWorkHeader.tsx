import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import PreviousButton from "./PreviousButton";

const AddArtWorkHeader = () => {
	return (
		<SafeAreaView className="bg-background">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6 items-center justify-center">
					<PreviousButton />
				</View>

				<View className="w-1/2 justify-center items-center">
					<Text className="font-DMSans text-[#7D1325] text-2xl">Add Art</Text>
				</View>
				<View className="w-1/6"></View>
			</View>

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default AddArtWorkHeader;
