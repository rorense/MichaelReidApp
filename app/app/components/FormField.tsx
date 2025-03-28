import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { twMerge } from "tailwind-merge";
import { RFValue } from "react-native-responsive-fontsize";

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
			<Text className={twMerge("font-DMSans")} style={{ fontSize: RFValue(16)}}>{title}</Text>
			<View className="w-full border-b-[1px] h-16 px-4 items-center flex-row">
				<TextInput
					className={twMerge("flex-1 font-DMSans")}
					style={{ fontSize: RFValue(14)}}
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