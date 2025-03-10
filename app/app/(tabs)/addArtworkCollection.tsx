import { View, Text, SafeAreaView, Alert, BackHandler } from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createArtworkCollection } from "@/lib/appwrite";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AddCollectionHeader from "../components/AddCollectionHeader";

const AddArtworkCollection = () => {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState<{
		title: string;
	}>({
		title: "",
	});

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				router.push("/collection");
				return true;
			};

			const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

			return () => backHandler.remove();
		}, [])
	);

	const submit = async () => {
		setUploading(true);

		try {
			await createArtworkCollection({
				...form,
				userId: user.$id,
			});
			Alert.alert("Success", "Collection added successfully");
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
			<AddCollectionHeader title="Add Collection" />
			<SafeAreaView className="bg-background h-full ">
				<View className="w-full justify-center items-center min-h-[65vh] flex">
					<View className="justify-center min-h-[65vh] text-center">
						<Text className="mt-10 text-center font-DMSans">Enter title of Collection</Text>
						<FormField
							placeholder="Title of Collection"
							otherStyles={"w-[85vw]"}
							value={form.title}
							handleChangeText={(e: any) => setForm({ ...form, title: e })}
						/>
						<View>
							<CustomButton
								title="Back"
								handlePress={() => router.push("/collection")}
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

export default AddArtworkCollection;
