import { Stack } from "expo-router";
import React from "react";
import DrawerLayout from "../components/DrawerLayout";
import ArtworkPage from "./artworkpage";

const TabsLayout = () => {
	return (
		<DrawerLayout>
			<Stack>
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
			</Stack>
		</DrawerLayout>
	);
};

export default TabsLayout;
