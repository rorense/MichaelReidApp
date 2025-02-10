import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState } from "react";

interface FormFieldProps {
	title?: string;
	value?: string;
	placeholder?: string;
	handleChangeText?: any;
	otherStyles?: any;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-l font-DMSans">{title}</Text>
			<View className="w-full border-b-[1px]  h-16 px-4  items-center flex-row">
				<TextInput
					className="flex-1 font-DMSans text-xl"
					value={value}
					placeholder={placeholder}
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
				/>
			</View>
		</View>
	);
};

export default FormField;
