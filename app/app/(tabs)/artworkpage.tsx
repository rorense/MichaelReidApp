import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { router, useLocalSearchParams } from "expo-router";
import ArtWorkHeader from "../components/ArtWorkHeader";
import { deleteArtwork } from "@/lib/appwrite";

type ArtworkPageRouteProp = RouteProp<RootStackParamList, "artworkpage">;

const ArtworkPage = ({ route }: { route: ArtworkPageRouteProp }) => {
	const { imageUrl, title, dimensions, year, edition, price, $id } = useLocalSearchParams();
	const navigation = useNavigation();

	const deleteArt = async () => {
		try {
			await deleteArtwork($id);
			Alert.alert("Success", "Artwork deleted successfully");
			router.push("/collection"); // Navigate back to the home page
		} catch (error) {
			Alert.alert("Error", "Failed to delete artwork. Please try again.");
		}
	};

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

				<View>
					<TouchableOpacity
						onPress={deleteArt}
						className="mt-5">
						<Text className="text-red- font-DMSans text-center">Delete Artwork</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
};

export default ArtworkPage;
