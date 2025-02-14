import { signOut } from "@/lib/appwrite";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Link, router, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerContent = (props: any) => {
	const navigation = useNavigation();

	const handleSignOut = async () => {
		try {
			await signOut();
			Alert.alert("Success", "Logged out successfully");
			router.replace("/sign-in");
		} catch (error) {
			Alert.alert("Error", "Something went wrong");
		}
	};

	return (
		<DrawerContentScrollView {...props}>
			<View>
				<Text className="text-center font-DMSans mt-4 mb-5 text-4xl">Michael Reid</Text>
				<Link href="/home">
					<Text className="text-3xl font-DMSans">Home</Text>
					<DrawerItem
						label="home"
						onPress={() => props.navigation.navigate("/home")}
					/>
				</Link>
				<Link href="/addArt">
					<Text className="text-3xl font-DMSans mt-5">Add Art</Text>
					<DrawerItem
						label="addArt"
						onPress={() => props.navigation.navigate("/addArt")}
					/>
				</Link>
				<TouchableOpacity onPress={handleSignOut}>
					<Text className="text-3xl font-DMSans bottom-0">Sign Out</Text>
				</TouchableOpacity>
			</View>
		</DrawerContentScrollView>
	);
};

export default function DrawerLayout() {
	return (
		<GestureHandlerRootView>
			<Drawer
				drawerContent={(props) => <DrawerContent {...props} />}
				screenOptions={{ headerShown: false }}></Drawer>
		</GestureHandlerRootView>
	);
}
