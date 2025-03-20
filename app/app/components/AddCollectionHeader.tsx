import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { twMerge } from 'tailwind-merge';

interface AddCollectionHeaderProps {
	title: string;
}

const AddCollectionHeader: React.FC<AddCollectionHeaderProps> = ({ title }) => {
	const navigation = useNavigation();

	return (
		<SafeAreaView className="bg-background mt-10">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6 items-center justify-center">
					<TouchableOpacity onPress={() => router.push("/(tabs)/collection")}>
						<Icon
							name="arrow-back"
							size={18}
						/>
					</TouchableOpacity>
				</View>

				<View className="w-1/2 justify-center items-center">
					<Text className={twMerge("font-DMSans text-[#7D1325]")} style={{ fontSize: RFValue(20)}}>{title}</Text>
				</View>
				<View className="w-1/6"></View>
			</View>

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default AddCollectionHeader;
