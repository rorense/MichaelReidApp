import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, SignIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignInPage = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLogged } = useGlobalContext();

	const submit = async () => {
		if (form.email === "" || form.password === "") {
			Alert.alert("Error", "Plase fill in all the fields");
		}

		setIsSubmitting(true);

		try {
			await SignIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLogged(true);

			Alert.alert("Success", "Logged in successfully");
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
				<View className="w-full justify-center min-h-[85vh] px-4 mt-10">
					<Text className="text-3xl text-primary text-center font-DMSans">Log In to Michael Reids</Text>
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
						title="Sign In"
						handlePress={submit}
						isLoading={isSubmitting}
					/>
					<View>
						<Text className="text-center font-DMSans mt-4">Don't have an account?</Text>
						<Link href="/sign-up">
							<Text className="text-center font-DMSans mt-5 text-red-950">Create an account</Text>
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignInPage;
