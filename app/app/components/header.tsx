import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React from "react";
import IconFeather from "react-native-vector-icons/Feather";
import IconIon from "react-native-vector-icons/Ionicons";
import { Link, useNavigation } from "expo-router";

interface HeaderProps {
	title?: string;
	isMainPage?: boolean;
	link?: string;
}

const Header: React.FC<HeaderProps> = ({ title, isMainPage = true, link }) => {
	const navigation = useNavigation();

	return (
		<SafeAreaView className="bg-background mt-10">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6">
					{/* Menu Icon or Back Button */}
					{isMainPage ? (
						<TouchableOpacity onPress={() => navigation.openDrawer()}>
							<IconFeather
								name="menu"
								size={24}
							/>
						</TouchableOpacity>
					) : link ? (
						<TouchableOpacity>
							<Link href={link}>
								<IconIon
									name="arrow-back"
									size={24}
								/>
							</Link>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<IconIon
								name="arrow-back"
								size={24}
							/>
						</TouchableOpacity>
					)}
				</View>

				<View className="w-1/2 flex justify-center items-center">
					{/* Web Title */}
					<TouchableOpacity>
						<Link href="/collection">
							{title ? (
								<Text className="text-center text-2xl font-bold">{title}</Text>
							) : (
								<Image
									source={require("../../assets/image/michael_reid.png")}
									style={{ width: 180, resizeMode: "contain" }}
								/>
							)}
						</Link>
					</TouchableOpacity>
				</View>

				<View className="w-1/6 flex flex-row justify-end">
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

			{/* Separator line */}
			<View className="border-b border-black w-full" />
		</SafeAreaView>
	);
};

export default Header;
