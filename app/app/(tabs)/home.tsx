import useAppwrite from "../../lib/useAppwrite";
import { deleteArtworkCollection, getAllArtworksByUser } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import ArtworkCard from "../components/ArtworkCard";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header"; // Correct import path

type HomeRouteProp = RouteProp<RootStackParamList, "home">;

const Home = () => {
	const { user } = useGlobalContext();
	const navigation = useNavigation();
	const route = useRoute<HomeRouteProp>();
	const { artworkCollectionId, title } = route.params || {};
	const { data: artworks, refetch, isLoading } = useAppwrite(getAllArtworksByUser, [artworkCollectionId]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	useFocusEffect(
		React.useCallback(() => {
			onRefresh();
		}, [artworkCollectionId])
	);

	const DeleteCollection = async () => {
		try {
			await deleteArtworkCollection(artworkCollectionId);
			Alert.alert("Success", "Collection deleted successfully");
			navigation.navigate("collection");
		} catch (error) {
			throw new Error(error);
		}
	};

	const navigateToArtworkPage = (item) => {
		navigation.navigate("artworkpage", { ...item });
	};

	const renderItem = ({ item }) => {
		if (item.type === "button") {
			return (
				<View>
					<TouchableOpacity className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-12">
						<Text
							className="text-center font-DMSans text-white text-2xl"
							onPress={() => navigation.navigate("addArt", { artworkCollectionId })}>
							Add Artwork
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={DeleteCollection}
						className="mt-5">
						<Text className="text-center font-DMSans text-black text-xl">Delete Collection</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<TouchableOpacity onPress={() => navigateToArtworkPage(item)}>
				<ArtworkCard artwork={item} />
			</TouchableOpacity>
		);
	};

	const dataWithButton = artworks ? [...artworks, { type: "button" }] : [{ type: "button" }];

	const renderContent = () => {
		if (isLoading) {
			return (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator
						size="large"
						color="#0000ff"
					/>
				</View>
			);
		}

		return (
			<View>
				<FlatList
					data={dataWithButton}
					keyExtractor={(item, index) => item.$id || index.toString()}
					renderItem={renderItem}
					contentContainerStyle={{ paddingBottom: 20 }}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			</View>
		);
	};

	return (
		<>
			<Header
				title={title || "MICHAEL REID"}
				isMainPage={false}
				link="/collection"
			/>
			<SafeAreaView className="bg-background flex-1">{renderContent()}</SafeAreaView>
		</>
	);
};

export default Home;
