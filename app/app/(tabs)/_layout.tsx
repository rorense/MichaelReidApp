import { Stack } from "expo-router";
import React from "react";
import DrawerLayout from "../components/DrawerLayout";
import ArtworkPage from "./artworkpage";
import Collection from "./collection";
import { createStackNavigator } from "@react-navigation/stack";

const TabsLayout = () => {
	const Stack = createStackNavigator();

	return (
		<DrawerLayout>
			<Stack.Navigator>
				<Stack.Screen
					name="home"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="addArt"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="artworkpage"
					options={{ headerShown: false }}
					component={ArtworkPage}
				/>
				<Stack.Screen
					name="collection"
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</DrawerLayout>
	);
};

export default TabsLayout;
