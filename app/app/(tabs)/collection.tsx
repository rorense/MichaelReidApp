import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, BackHandler, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";
import { getArtworkCollectionByUser } from "@/lib/appwrite";
import { Link } from "expo-router";
import CollectionCard from "../components/CollectionCard";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";

const Collection = () => {
	const { user } = useGlobalContext();
	const { data: collection, refetch } = useAppwrite(getArtworkCollectionByUser, [user.$id]);
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

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				Alert.alert("Hold on!", "Are you sure you want to exit?", [
					{
						text: "Cancel",
						onPress: () => null,
						style: "cancel",
					},
					{ text: "YES", onPress: () => BackHandler.exitApp() },
				]);
				return true;
			};

			const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

			return () => backHandler.remove();
		}, [])
	);

	const renderItem = ({ item }) => {
		if (item.type === "button") {
			return (
				<TouchableOpacity className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5">
					<Link href={"/addArtworkCollection"}>
						<Text className="text-center font-DMSans text-white text-2xl">Create Collection</Text>
					</Link>
				</TouchableOpacity>
			);
		}
		return <CollectionCard collection={item} />;
	};

	const dataWithButton = collection ? [...collection, { type: "button" }] : [{ type: "button" }];

	return (
		<>
			<Header isMainPage={true} />
			<SafeAreaView className="bg-background flex-1">
				{collection && collection.length > 0 ? (
					<View className="flex justify-center">
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
				) : (
					<View className="mt-10">
						<Text className="text-xl text-center font-black font-DMSans">You don't have any artworks collection!</Text>
						<TouchableOpacity className="bg-primary rounded-full py-4 flex w-[50vw] justify-center items-center mx-auto mt-5">
							<Link href={"/addArtworkCollection"}>
								<Text className="text-center font-DMSans text-white text-2xl">Create Collection</Text>
							</Link>
						</TouchableOpacity>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

export default Collection;
