import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const PreviousButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Icon
				name="arrow-back"
				size={18}
			/>
		</TouchableOpacity>
	);
};

export default PreviousButton;
