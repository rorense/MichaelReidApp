import Header from "../components/Header";
import useAppwrite from "../../lib/useAppwrite";
import { getAllArtworksByUser } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import ArtworkCard from "../components/ArtworkCard";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Link } from "expo-router";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary

type HomeRouteProp = RouteProp<RootStackParamList, "home">;

const Home = () => {
	const { user } = useGlobalContext();
	const navigation = useNavigation();
	const route = useRoute<HomeRouteProp>();
	const { artworkCollectionId } = route.params || {};
	const { data: artworks, refetch } = useAppwrite(getAllArtworksByUser, [user.$id, artworkCollectionId]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	useEffect(() => {
		onRefresh();
	}, [artworkCollectionId]);

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background flex-1">
				{artworks && artworks.length > 0 ? (
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
				) : (
					<View className="mt-10">
						<Text className="text-xl text-center font-black font-DMSans">You don't have any artworks!</Text>
						<TouchableOpacity
							className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5"
							onPress={() => navigation.navigate("addArt", { artworkCollectionId })}>
							<Text className="text-center font-DMSans text-white text-2xl">Add Artworks</Text>
						</TouchableOpacity>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

export default Home;
