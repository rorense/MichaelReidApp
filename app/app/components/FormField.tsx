import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface FormFieldProps {
	title?: string;
	value?: string;
	placeholder?: string;
	handleChangeText?: any;
	otherStyles?: any;
	fieldType?: "text" | "number";
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, fieldType = "text", ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-l font-DMSans">{title}</Text>
			<View className="w-full border-b-[1px] h-16 px-4 items-center flex-row">
				<TextInput
					className="flex-1 font-DMSans text-xl"
					value={value}
					placeholder={placeholder}
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					keyboardType={fieldType === "number" ? "numeric" : "default"}
				/>
				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Icon
							name={showPassword ? "eye-off" : "eye"}
							size={20}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
