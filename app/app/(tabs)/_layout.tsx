import { Stack } from "expo-router";
import React from "react";
import DrawerLayout from "../components/DrawerLayout";

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
			</Stack>
		</DrawerLayout>
	);
};

export default TabsLayout;
