import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		"DM Sans": require("../assets/fonts/DMSans-Regular.ttf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) return null;

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="(auth)"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
