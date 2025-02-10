import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
	title: string;
	handlePress: any;
	isLoading: any;
	color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, isLoading, color }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`${
				color === "brown" ? "bg-primary" : "bg-white border-black border-[1px]"
			} py-4 rounded-full items-center flex flex-row justify-center text-center mt-5`}>
			<Text className={`font-DMSans ${color == "brown" ? "color-white" : "color-black"}`}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
