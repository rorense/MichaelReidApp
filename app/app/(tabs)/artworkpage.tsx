import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, BackHandler, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { router, useLocalSearchParams } from "expo-router";
import ArtWorkHeader from "../components/ArtWorkHeader";
import { deleteArtwork } from "@/lib/appwrite";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

type ArtworkPageRouteProp = RouteProp<RootStackParamList, "artworkpage">;

const ArtworkPage = ({ route }: { route: ArtworkPageRouteProp }) => {
	const { imageUrl, title, artist, dimensions, year, edition, price, $id, artworkCollectionId } = useLocalSearchParams();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				navigation.goBack();
				return true;
			};

			const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

			return () => backHandler.remove();
		}, [artworkCollectionId])
	);

	const deleteArt = async () => {
		try {
			await deleteArtwork($id);
			Alert.alert("Success", "Artwork deleted successfully");
			router.push("/collection"); // Navigate back to the home page for that collection
		} catch (error) {
			Alert.alert("Error", "Failed to delete artwork. Please try again.");
		}
	};

	console.log("Year", year)
	console.log("Edition", edition)
	return (
		<>
			<ArtWorkHeader title={title} />
			<SafeAreaView className="bg-background pt-10 h-full">
				{loading && (
					<View className="flex justify-center items-center">
						<ActivityIndicator
							size="large"
							color="#7D1325"
						/>
					</View>
				)}
				{typeof imageUrl === "string" && (
					<Image
						source={{ uri: imageUrl }}
						className="h-96 mt-2"
						resizeMode="contain"
						onLoadStart={() => setLoading(true)}
						onLoadEnd={() => setLoading(false)}
					/>
				)}
				<View className="mt-10 mb-10">
					{title !== "null" && (
						<Text className="font-semibold font-DMSans text-[#7D1325] text-center italic" style={{ fontSize: RFValue(24) }}>
							{title}
						</Text>
					)}
					{artist !== "null" && (
						<Text className="font-semibold font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
							{artist}
						</Text>
					)}
					{year !== "null" && (
						<Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
							{year}
						</Text>
					)}
				</View>
				{edition !== "null" && (
					<Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
						Edition: {edition}
					</Text>
				)}
				{dimensions && dimensions !== "null" && (
					<Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
						Dimensions: {dimensions}
					</Text>
				)}
				{price !== "null" && (
					<View className="mt-5">
						<Text className="font-semibold font-DMSans text-[#7D1325] text-center" style={{ fontSize: RFValue(20) }}>
							${price}
						</Text>
					</View>
				)}
				<View>
					<TouchableOpacity
						onPress={deleteArt}
						className="mt-5">
						<Text className="font-DMSans text-center text-red-800" style={{ fontSize: RFValue(14)}}>Delete Artwork</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
};

export default ArtworkPage;
