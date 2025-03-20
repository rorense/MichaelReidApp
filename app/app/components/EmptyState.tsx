import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { twMerge } from "tailwind-merge";
import { RFValue } from "react-native-responsive-fontsize";

interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = () => {
	return (
		<View className="w-full justify-center min-h-[25vh] px-4">
			<Text className={twMerge("text-center font-DMSans")} style={{ fontSize: RFValue(18)}}>You have no items here...</Text>
		</View>
	);
};

export default EmptyState;
