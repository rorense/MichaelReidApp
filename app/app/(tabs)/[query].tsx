import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";
import { searchArtworks } from "@/lib/appwrite";
import { useLocalSearchParams, router, useNavigation, useFocusEffect } from "expo-router";
import ArtworkCard from "../components/ArtworkCard";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import { RFValue } from "react-native-responsive-fontsize";


const Search = () => {
	const { query } = useLocalSearchParams();
	const { user } = useGlobalContext();
	const { data: artworks, refetch, isLoading } = useAppwrite(
		searchArtworks,
		[query, user?.$id]
	);
	const navigation = useNavigation();

	useEffect(() => {
		refetch();
	}, [query]);

	const navigateToArtworkPage = (item) => {
		router.push({
			pathname: "/artworkpage",
			params: { ...item, artworkCollectionId: item.artworkCollection }
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				navigation.navigate("collection");
				return true;
			};

			const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

			return () => backHandler.remove();
		}, [])
	);

	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity onPress={() => navigateToArtworkPage(item)}>
			<ArtworkCard artwork={item} />
		</TouchableOpacity>
	);

	const renderContent = () => {
		if (isLoading) {
			return (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#7D1325" />
				</View>
			);
		}

		if (!artworks || artworks.length === 0) {
			return <EmptyState />;
		}

		return (
			<FlatList
				data={artworks}
				keyExtractor={(item, index) => item.$id || index.toString()}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		);
	};

	return (
		<>
			<Header title={`Search: ${query}`} isMainPage={false} link="/collection" />
			<SafeAreaView className="bg-background flex-1">
				<Text className="text-center font-DMSans mt-4 mb-2" style={{ fontSize: RFValue(16) }}>
					Search Results for "{query}"
				</Text>
				{renderContent()}
			</SafeAreaView>
		</>
	);
};

export default Search;