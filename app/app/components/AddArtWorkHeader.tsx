import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import PreviousButton from "./PreviousButton";
import { RFValue } from "react-native-responsive-fontsize";
import { twMerge } from 'tailwind-merge';

interface AddArtWorkHeaderProps {
	title: string;
}

const AddArtWorkHeader: React.FC<AddArtWorkHeaderProps> = ({ title }) => {
	return (
		<SafeAreaView className="bg-background mt-10">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6 items-center justify-center">
					<PreviousButton />
				</View>

				<View className="w-1/2 justify-center items-center">
					<Text className={twMerge("font-DMSans text-[#7D1325]")} style={{ fontSize: RFValue(20)}}>{title}</Text>
				</View>
				<View className="w-1/6"></View>
			</View>

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default AddArtWorkHeader;
