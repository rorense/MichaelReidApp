import { View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const PreviousButton = () => {
	const navigation = useNavigation();

	return (
		<View className="p-2">
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Icon
					name="arrow-back"
					size={24}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default PreviousButton;
