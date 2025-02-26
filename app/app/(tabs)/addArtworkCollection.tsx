import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import AddArtWorkHeader from "../components/AddArtWorkHeader";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createArtworkCollection } from "@/lib/appwrite";
import { router } from "expo-router";

const addArtworkCollection = () => {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState<{
		title: string;
	}>({
		title: "",
	});

	const submit = async () => {
		setUploading(true);

		try {
			await createArtworkCollection({
				...form,
				userId: user.$id,
			});
			Alert.alert("Success", "Artwork added successfully");
			router.push("/collection");
		} catch (error) {
			console.error("Error creating Collection:", error);
			Alert.alert("Error", "Failed to Create artwork. Please try again.");
		} finally {
			setForm({
				title: "",
			});
			setUploading(false);
		}
	};

	return (
		<>
			<AddArtWorkHeader title="Add Collection" />
			<SafeAreaView className="bg-background h-full ">
				<View className="w-full justify-center items-center min-h-[65vh] flex">
					<View className="justify-center min-h-[65vh] text-center">
						<Text className="mt-10 text-center font-DMSans">Enter title of work</Text>
						<FormField
							placeholder="Title of Work"
							otherStyles={"w-[85vw]"}
							value={form.title}
							handleChangeText={(e: any) => setForm({ ...form, title: e })}
						/>
						<View>
							<CustomButton
								title="Back"
								handlePress={() => router.push("/home")}
								isLoading={false}
							/>
							<CustomButton
								title="Create Artwork Collection"
								handlePress={submit}
								isLoading={false}
								color="brown"
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default addArtworkCollection;
