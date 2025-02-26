import Header from "../components/Header";
import useAppwrite from "../../lib/useAppwrite";
import { deleteArtworkCollection, getAllArtworksByUser } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import ArtworkCard from "../components/ArtworkCard";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { useFocusEffect } from "@react-navigation/native";

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
		}, [])
	);

	const DeleteCollection = async () => {
		try {
			await deleteArtworkCollection(artworkCollectionId);
			Alert.alert("Success", "Collection deleted successfully");
			router.push("/collection");
		} catch (error) {
			throw new Error(error);
		}
	};
	console.log(artworks);
	return (
		<>
			<Header title={title} />
			<SafeAreaView className="bg-background flex-1">
				{isLoading ? (
					<View className="flex-1 justify-center items-center">
						<ActivityIndicator
							size="large"
							color="#fffff"
						/>
					</View>
				) : artworks && artworks.length > 0 ? (
					<View>
						<FlatList
							data={artworks}
							keyExtractor={(item) => item.$id}
							renderItem={({ item }) => <ArtworkCard artwork={item} />}
							contentContainerStyle={{ paddingBottom: 20 }}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
								/>
							}
						/>
						<TouchableOpacity className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5">
							<Link href={"/addArt"}>
								<Text className="text-center font-DMSans text-white text-2xl">Add Artwork</Text>
							</Link>
						</TouchableOpacity>
						<TouchableOpacity onPress={DeleteCollection}>
							<Text className="mt-5 text-center font-DMSans text-black text-xl">Delete Collection</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View className="mt-10">
						<Text className="text-xl text-center font-black font-DMSans">You don't have any artworks!</Text>
						<TouchableOpacity
							className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5"
							onPress={() => navigation.navigate("addArt", { artworkCollectionId })}>
							<Text className="text-center font-DMSans text-white text-2xl">Add Artworks</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={DeleteCollection}>
							<Text className="mt-5 text-center font-DMSans text-black text-xl">Delete Collection</Text>
						</TouchableOpacity>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

export default Home;
