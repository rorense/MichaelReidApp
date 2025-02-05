import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<View>
				<Text className="text-center font-DMSans mt-4 mb-5 text-4xl">Michael Reid</Text>
				<Link href="/home">
					<Text className="text-3xl font-DMSans">Home</Text>
					<DrawerItem
						label="home"
						onPress={() => props.navigation.navigate("(tabs )/home")}
					/>
				</Link>
				<Link href="/addArt">
					<Text className="text-3xl font-DMSans mt-5">Add Art</Text>
					<DrawerItem
						label="addArt"
						onPress={() => props.navigation.navigate("(tabs)/addArt")}
					/>
				</Link>
			</View>
		</DrawerContentScrollView>
	);
};

export default function DrawerLayout() {
	return (
		<GestureHandlerRootView>
			<Drawer
				drawerContent={(props) => <DrawerContent {...props} />}
				screenOptions={{ headerShown: false }}>
				<Drawer.Screen name="(tabs)" />
			</Drawer>
		</GestureHandlerRootView>
	);
}
