import Header from "../components/Header";
import useAppwrite from "../../lib/useAppwrite";
import { getAllArtworks, getAllArtworksByUser, getCurrentUser } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text } from "react-native";
import ArtworkCard from "../components/ArtworkCard";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";

const Home = () => {
	const { user } = useGlobalContext();
	const { data: artworks, refetch } = useAppwrite(getAllArtworksByUser, [user.$id]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background flex-1">
				{artworks ? (
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
					<Text>Loading...</Text>
				)}
			</SafeAreaView>
		</>
	);
};

export default Home;
