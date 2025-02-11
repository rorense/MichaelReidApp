import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import Icon from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { createArtwork } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const AddArt = () => {
	const [step, setStep] = useState(1);
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState({
		title: "",
		year: "",
		price: "",
		edition: "",
		dimensions: "",
		images: null,
	});

	const openPicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const selectedImage = result.assets[0];
			const file = {
				name: selectedImage.fileName || "image.jpg",
				MimeType: selectedImage.type || "image/jpeg",
				fileSize: selectedImage.fileSize || 0,
				uri: selectedImage.uri,
			};

			setForm({ ...form, images: file });
		}
	};

	const nextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const submit = async () => {
		if (!form.title || !form.year || !form.price || !form.dimensions || !form.images) {
			return Alert.alert("Please fill all fields");
		}
		setUploading(true);

		try {
			await createArtwork({
				...form,
				userId: user.$id,
			});

			Alert.alert("Success", "Artwork added successfully");
			router.push("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setForm({
				title: "",
				year: "",
				price: "",
				edition: "",
				dimensions: "",
				images: null,
			});

			setUploading(false);
		}
	};

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background h-full">
				<View className="w-full justify-center items-center min-h-[85h] flex">
					<Text className="text-center font-DMSans text-4xl top-10">Add Art</Text>

					{/* Title */}
					{step === 1 && (
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
									title="Cancel"
									handlePress={() => router.replace("/home")}
									isLoading={false}
								/>
								<CustomButton
									title="Create"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}

					{/* Year */}
					{step === 2 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Enter year of work</Text>
							<FormField
								placeholder="Year of Work"
								otherStyles={"w-[85vw]"}
								value={form.year}
								handleChangeText={(e: any) => setForm({ ...form, year: e })}
							/>
							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Next"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}
					{/* Dimensions */}
					{step === 3 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Artwork Dimensions</Text>
							<FormField
								placeholder="Dimensions"
								otherStyles={"w-[85vw]"}
								value={form.dimensions}
								handleChangeText={(e: any) => setForm({ ...form, dimensions: e })}
							/>
							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Next"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}
					{/* Price */}
					{step === 4 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Enter Price</Text>
							<FormField
								placeholder="Enter Price"
								otherStyles={"w-[85vw]"}
								value={form.price}
								handleChangeText={(e: any) => setForm({ ...form, price: e })}
							/>
							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Next"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}
					{/* Edition/More */}
					{step === 5 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Edition/More</Text>
							<FormField
								placeholder="Edition"
								otherStyles={"w-[85vw]"}
								value={form.edition}
								handleChangeText={(e) => setForm({ ...form, edition: e })}
							/>
							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Next"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}
					{/* Pictures */}
					{step === 6 && (
						<View className="justify-center min-h-[65vh] text-center w-[85vw]">
							<Text className="mt-10 text-center font-DMSans">Pictures</Text>
							<TouchableOpacity onPress={() => openPicker()}>
								{form.images ? (
									<Image
										source={{ uri: form.images.uri }}
										resizeMode="cover"
										className="w-full h-64 rounded-2xl"
									/>
								) : (
									<View className="w-full h-64 bg-gray-200 rounded-2xl justify-center items-center">
										<View className="w-14 h-14 border border-dashed justify-center items-center">
											<Icon
												name="upload"
												size={24}
											/>
										</View>
									</View>
								)}
							</TouchableOpacity>
							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Complete"
									handlePress={submit}
									isLoading={uploading}
									color="brown"
								/>
							</View>
						</View>
					)}
				</View>
			</SafeAreaView>
		</>
	);
};

export default AddArt;
