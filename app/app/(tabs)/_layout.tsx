import { Stack } from "expo-router";
import React from "react";
import DrawerLayout from "../components/DrawerLayout";
import ArtworkPage from "./artworkpage";
import Collection from "./collection";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./[query]";

const TabsLayout = () => {
	const Stack = createStackNavigator();

	return (
		<DrawerLayout>
			<Stack.Navigator>
				<Stack.Screen name="home" />
				<Stack.Screen name="addArt" />
				<Stack.Screen
					name="artworkpage"
					component={ArtworkPage}
				/>
				<Stack.Screen
					name="collection"
					component={Collection}
				/>
				<Stack.Screen
					name="(search)/[query]"
					component={Search}
					/>
			</Stack.Navigator>
		</DrawerLayout>
	);
};

export default TabsLayout;
