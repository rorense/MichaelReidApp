import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
	title: string;
	handleSubmit: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handleSubmit }) => {
	return (
		<TouchableOpacity
			onPress={handleSubmit}
			activeOpacity={0.7}
			className="bg-primary py-4 rounded-full items-center flex flex-row justify-center text-center mt-5">
			<Text className="font-DMSans color-white">{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
