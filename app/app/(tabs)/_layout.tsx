import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

const TabsLayout = () => {
	return (
		<>
			<Tabs>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarInactiveTintColor: "#CDCDE0",
					}}
				/>
				<Tabs.Screen
					name="addArt"
					options={{
						title: "Add",
						headerShown: false,
						tabBarInactiveTintColor: "#CDCDE0",
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarInactiveTintColor: "#CDCDE0",
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
