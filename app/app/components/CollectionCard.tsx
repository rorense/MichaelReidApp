import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary

type CollectionCardNavigationProp = StackNavigationProp<RootStackParamList, "home">;

const CollectionCard = ({ collection }: { collection: any }) => {
	const navigation = useNavigation<CollectionCardNavigationProp>();
	const { title, $id } = collection;

	return (
		<TouchableOpacity
			className="mt-4 w-[85vw] flex justify-center items-center h-[200px] border-solid border-2 self-center"
			onPress={() => navigation.navigate("home", { artworkCollectionId: $id, title: title })}>
			<Text className="text-center font-DMSans text-2xl">{title}</Text>
		</TouchableOpacity>
	);
};

export default CollectionCard;
