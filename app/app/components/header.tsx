import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import IconFeather from "react-native-vector-icons/Feather";
import IconIon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";

const Header = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView className="bg-background">
			<View className="flex flex-row m-7 justify-between">
				<View className="w-1/6">
					{/* Menu Icon */}
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<IconFeather
							name="menu"
							size={24}
						/>
					</TouchableOpacity>
				</View>

				<View className="w-1/2">
					{/* Web Title */}
					<TouchableOpacity>
						<Link href="/home">
							<Text className="text-center text-2xl">MICHAEL REID</Text>
						</Link>
					</TouchableOpacity>
				</View>

				<View className="w-1/6 flex flex-row gap-4">
					{/* Search Icon */}
					<TouchableOpacity>
						<IconFeather
							name="search"
							size={22}
						/>
					</TouchableOpacity>

					{/* Add Icon */}
					<TouchableOpacity>
						<Link href="/addArt">
							<IconIon
								name="add-circle-sharp"
								size={24}
								color={"#7D1325"}></IconIon>
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
