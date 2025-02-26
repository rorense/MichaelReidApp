import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary

type ArtworkCardNavigationProp = StackNavigationProp<RootStackParamList, "artworkpage">;

const ArtworkCard = ({ artwork }: { artwork: any }) => {
	const navigation = useNavigation<ArtworkCardNavigationProp>();
	const { title, year, price, edition, dimensions, images, $id } = artwork;

	// Ensure images is a valid URL
	const imageUrl = Array.isArray(images) ? images[0] : images; // Get first image if it's an array
	return (
		<TouchableOpacity
			className="w-11/12 mb-5 self-center"
			onPress={() => navigation.navigate("artworkpage", { imageUrl, title, dimensions, year, edition, price, $id })}>
			{imageUrl ? (
				<ImageBackground
					source={{ uri: imageUrl }}
					className="w-full h-96 justify-end top-10">
					<View className="m-3 p-3 bg-[#7D1325]">
						<Text className="text-white text-lg font-bold font-DMSans">{title}</Text>
						<Text className="text-white font-DMSans">
							{year} | {dimensions}
						</Text>
					</View>
				</ImageBackground>
			) : (
				<View className="p-3 bg-gray-500 h-96 justify-center items-center">
					<Text className="text-white">No Image Available</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default ArtworkCard;
