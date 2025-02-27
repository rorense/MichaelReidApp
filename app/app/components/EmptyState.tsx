import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = () => {
	return (
		<View className="w-full justify-center min-h-[25vh] px-4">
			<Text className="text-center font-DMSans text-xl">You have no items here...</Text>
		</View>
	);
};

export default EmptyState;
