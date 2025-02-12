import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { useLocalSearchParams } from "expo-router";
import ArtWorkHeader from "../components/ArtWorkHeader";

type ArtworkPageRouteProp = RouteProp<RootStackParamList, "artworkpage">;

const ArtworkPage = ({ route }: { route: ArtworkPageRouteProp }) => {
	const { imageUrl, title, dimensions, year, edition, price } = useLocalSearchParams();

	return (
		<>
			<ArtWorkHeader title={title} />
			<SafeAreaView className="bg-background  pt-10 h-full">
				{typeof imageUrl === "string" && (
					<Image
						source={{ uri: imageUrl }}
						className="h-96"
						resizeMode="contain"
					/>
				)}
				<View className="mt-10 mb-10">
					<Text className="font-semibold font-DMSans text-2xl text-black text-center">{title}</Text>
					<Text className="font-DMSans text-xl text-black text-center">{year}</Text>
				</View>
				<Text className="font-DMSans text-xl text-black text-center">{edition}</Text>
				<Text className="font-DMSans text-xl text-black text-center">{dimensions}</Text>
				<View className="mt-5">
					<Text className="font-semibold font-DMSans text-2xl text-[#7D1325] text-center">${price}</Text>
				</View>
			</SafeAreaView>
		</>
	);
};

export default ArtworkPage;
