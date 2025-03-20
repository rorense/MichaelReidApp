import { signOut } from "@/lib/appwrite";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link, router, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { twMerge } from 'tailwind-merge';

const DrawerContent = (props: any) => {
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
			<View className="flex-1">
				<View className="items-center">
					<Image
						source={require("../../assets/image/michael_reid.png")}
						style={{ width: 160, height: 100, resizeMode: "contain" }}
					/>
					<TouchableOpacity onPress={() => {}}>
						<Link href="/collection">
							<Text className={twMerge("font-DMSans mt-5")} style={{ fontSize: RFValue(24)}}>SEE COLLECTION</Text>
						</Link>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}}>
						<Link href="/profile">
							<Text className={twMerge("font-DMSans mt-5")} style={{ fontSize: RFValue(24)}}>PROFILE</Text>
						</Link>
					</TouchableOpacity>
				</View>
				<View className="mt-[400px] mb-4">
					<TouchableOpacity
						onPress={handleSignOut}
						className="flex justify-center items-center">
						<Text className={twMerge("font-DMSans mt-5")} style={{ fontSize: RFValue(24)}}>SIGN OUT</Text>
					</TouchableOpacity>
					<Link href="https://michaelreid.com.au/">
						<Text className={twMerge("text-center font-DMSans text-blue-500")} style={{ fontSize: RFValue(20)}}>Visit Website</Text>
					</Link>
					<Link href="https://michaelreid.com.au/privacy-policy-app/">
						<Text className={twMerge("text-center font-DMSans text-blue-500")} style={{ fontSize: RFValue(20)}}>Privacy Policy</Text>
					</Link>
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

export default function DrawerLayout() {
	return (
		<GestureHandlerRootView>
			<Drawer
				drawerContent={(props) => <DrawerContent {...props} />}
				screenOptions={{ headerShown: false }}
			/>
		</GestureHandlerRootView>
	);
}
