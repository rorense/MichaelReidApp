import { View, Text, SafeAreaView, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import IconFeather from "react-native-vector-icons/Feather";
import IconIon from "react-native-vector-icons/Ionicons";
import { Link, useNavigation } from "expo-router";
import { twMerge } from "tailwind-merge";
import { RFValue } from "react-native-responsive-fontsize";
import Feather from "@expo/vector-icons/Feather";
import SearchInput from "./SearchInput";

interface HeaderProps {
	title?: string;
	isMainPage?: boolean;
	link?: string;
}

const Header: React.FC<HeaderProps> = ({ title, isMainPage = true, link }) => {
	const navigation = useNavigation();
	const [searchModalVisible, setSearchModalVisible] = useState(false);

	return (
		<SafeAreaView className="bg-background mt-10">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6">
					{/* Menu Icon or Back Button */}
					{isMainPage ? (
						<TouchableOpacity onPress={() => navigation.openDrawer()}>
							<IconFeather name="menu" size={24} />
						</TouchableOpacity>
					) : link ? (
						<TouchableOpacity>
							<Link href={link}>
								<IconIon name="arrow-back" size={24} />
							</Link>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<IconIon name="arrow-back" size={24} />
						</TouchableOpacity>
					)}
				</View>

				<View className="w-1/2 flex justify-center items-center">
					{/* Web Title */}
					<TouchableOpacity>
						<Link href="/collection">
							{title ? (
								<Text className={twMerge("text-center font-bold")} style={{ fontSize: RFValue(20)}}>{title}</Text>
							) : (
								<Image
									source={require("../../assets/image/michael_reid.png")}
									style={{ width: 180, resizeMode: "contain" }}
								/>
							)}
						</Link>
					</TouchableOpacity>
				</View>

				<View className="w-1/6 flex flex-row justify-end items-center">
					{/* Search Icon */}
					<TouchableOpacity style={{ marginRight: 12 }} onPress={() => setSearchModalVisible(true)}>
						<Feather name="search" size={24} color="black" />
					</TouchableOpacity>
					{/* Add Icon */}
					<TouchableOpacity>
						<Link href="/addArtworkCollection">
							<IconIon
								name="add-circle-sharp"
								size={24}
								color={"#7D1325"}
							/>
						</Link>
					</TouchableOpacity>
				</View>
			</View>

			{/* Search Modal */}
			<Modal
				visible={searchModalVisible}
				animationType="fade"
				transparent={true}
				onRequestClose={() => setSearchModalVisible(false)}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPressOut={() => setSearchModalVisible(false)}
					style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" }}
				>
					<Pressable
						onPress={() => {}}
						style={{
							backgroundColor: "white",
							borderRadius: 12,
							padding: 24,
							width: "90%",
							height: 80,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<SearchInput />
					</Pressable>
				</TouchableOpacity>
			</Modal>

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default Header;
