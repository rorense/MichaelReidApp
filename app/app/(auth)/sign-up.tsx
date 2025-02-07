import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite.js";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUpPage = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLogged } = useGlobalContext();

	const submit = async () => {
		if (form.username === "" || form.password === "" || form.email === "") {
			Alert.alert("Error", "Plase fill in all the fields");
		}

		setIsSubmitting(true);

		try {
			const result = await createUser(form.email, form.password, form.username);
			setUser(result);
			setIsLogged(true);

			router.replace("/home");
		} catch (error) {
			console.log(error);
			Alert.alert("Error", "Something went wrong");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full bg-background">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl text-primary text-center font-DMSans">Sign Up to Michael Reids</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e: any) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e: any) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						// keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e: any) => setForm({ ...form, password: e })}
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
