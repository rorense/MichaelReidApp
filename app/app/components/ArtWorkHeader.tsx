import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import PreviousButton from "./PreviousButton";
import { RFValue } from "react-native-responsive-fontsize";
import { twMerge } from "tailwind-merge";

type ArtWorkHeaderProps = {
	title: string;
};

const ArtWorkHeader: React.FC<ArtWorkHeaderProps> = ({ title }) => {
	return (
		<SafeAreaView className="bg-background mt-10">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6 items-center justify-center">
					<PreviousButton />
				</View>

				<View className="w-1/2 justify-center items-center">
					{/* Web Title */}
					<Text className={twMerge("font-DMSans text-[#7D1325] text-2xl")} style={{fontSize: RFValue(20)}}>{title}</Text>
				</View>
				<View className="w-1/6"></View>
			</View>

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default ArtWorkHeader;
