import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

const SignUpPage = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = () => {};

	return (
		<SafeAreaView className="h-full bg-background">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl text-primary text-center font-DMSans">Sign Up to Michael Reids</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="Sign Up"
						handlePress={submit}
						isLoading={isSubmitting}
					/>
					<View>
						<Text className="text-center font-DMSans mt-4">Already have an account?</Text>
						<Link href="/sign-in">
							<Text className="text-center font-DMSans mt-5 text-red-950">Login to your account</Text>
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUpPage;
