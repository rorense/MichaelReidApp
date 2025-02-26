import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";
import { getArtworkCollectionByUser } from "@/lib/appwrite";
import Header from "../components/Header";
import ArtworkCard from "../components/ArtworkCard";
import { Link } from "expo-router";
import CollectionCard from "../components/CollectionCard";

const collection = () => {
	const { user } = useGlobalContext();
	const { data: collection, refetch } = useAppwrite(getArtworkCollectionByUser, [user.$id]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	useEffect(() => {
		onRefresh();
	}, []);

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background flex-1">
				{collection && collection.length > 0 ? (
					<View className="flex justify-center">
						<FlatList
							data={collection}
							keyExtractor={(item) => item.$id}
							renderItem={({ item }) => <CollectionCard collection={item} />}
							contentContainerStyle={{ paddingBottom: 20 }}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
								/>
							}
						/>
					</View>
				) : (
					<View className="mt-10">
						<Text className="text-xl text-center font-black font-DMSans">You don't have any artworks collection!</Text>
						<TouchableOpacity className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5">
							<Link href={"/addArtworkCollection"}>
								<Text className="text-center font-DMSans text-white text-2xl">Add Collection</Text>
							</Link>
						</TouchableOpacity>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

export default collection;
