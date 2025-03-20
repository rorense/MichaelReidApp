import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { RFValue } from "react-native-responsive-fontsize";
import { twMerge } from "tailwind-merge";

type CollectionCardNavigationProp = StackNavigationProp<RootStackParamList, "home">;

const CollectionCard = ({ collection }: { collection: any }) => {
	const navigation = useNavigation<CollectionCardNavigationProp>();
	const { title, $id, gallery } = collection;

	const backgroundImage = gallery && gallery.length > 0 ? { uri: gallery[0].images } : null;

	return (
		<TouchableOpacity
			className="mt-4 w-[85vw] flex justify-center items-center h-[200px] border-solid border-2 self-center"
			onPress={() => navigation.navigate("home", { artworkCollectionId: $id, title: title })}>
			<ImageBackground
				source={backgroundImage} // Use the first image in the gallery or null
				style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
				imageStyle={{ opacity: 0.2 }} // Adjust the opacity as needed
			>
				<Text className={twMerge("text-center font-DMSans font-semibold italic")} style={{ fontSize: RFValue(32)}}>{title}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default CollectionCard;
