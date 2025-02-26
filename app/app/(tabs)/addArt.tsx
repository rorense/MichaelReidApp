import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import Icon from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { createArtwork } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import AddArtWorkHeader from "../components/AddArtWorkHeader";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { router } from "expo-router";

type AddArtRouteProp = RouteProp<RootStackParamList, "addArt">;

const AddArt = () => {
	const route = useRoute<AddArtRouteProp>();
	const { artworkCollectionId } = route.params || {};
	const [step, setStep] = useState(1);
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState<{
		title: string;
		year: number | null; // Change to number or null
		price: number | null; // Change to number or null
		edition: number | null; // Change to number or null
		dimensions: string;
		images: { name: string; mimeType: string; fileSize: number; uri: string } | null;
	}>({
		title: "",
		year: null, // Initialize as null
		price: null, // Initialize as null
		edition: null, // Initialize as null
		dimensions: "",
		images: null,
	});

	console.log("Artwork Collection ID", artworkCollectionId);

	const openPicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permission required", "Please grant permission to access the photo library.");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use "Images" to ensure only images are selected
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const selectedImage = result.assets[0];

			// Determine the correct MIME type based on the file extension or URI
			const getMimeType = (uri) => {
				const extension = uri.split(".").pop().toLowerCase();
				switch (extension) {
					case "jpg":
						return "image/jpg";
					case "jpeg":
						return "image/jpeg";
					case "png":
						return "image/png";
					case "gif":
						return "image/gif";
					case "webp":
						return "image/webp";
					default:
						return "image/jpeg"; // Fallback to JPEG if the type is unknown
				}
			};

			const file = {
				name: selectedImage.fileName || `image_${Date.now()}.jpg`, // Fallback name with timestamp
				mimeType: getMimeType(selectedImage.uri), // Use the function to determine MIME type
				fileSize: selectedImage.fileSize || 0,
				uri: selectedImage.uri,
			};

			setForm({ ...form, images: file });
		}
	};

	const handleYearChange = (e: string) => {
		const year = parseInt(e, 10);
		if (!isNaN(year)) {
			setForm({ ...form, year });
		} else {
			setForm({ ...form, year: null });
		}
	};

	const handlePriceChange = (e: string) => {
		const price = parseInt(e, 10);
		if (!isNaN(price)) {
			setForm({ ...form, price });
		} else {
			setForm({ ...form, price: null });
		}
	};

	const handleEditionChange = (e: string) => {
		const edition = parseInt(e, 10);
		if (!isNaN(edition)) {
			setForm({ ...form, edition });
		} else {
			setForm({ ...form, edition: null });
		}
	};

	const nextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const submit = async () => {
		if (!form.title || form.year === null || form.price === null || form.edition === null || !form.dimensions || !form.images) {
			return Alert.alert("Error", "Please fill all fields with valid values.");
		}

		setUploading(true);

		try {
			await createArtwork({
				...form,
				userId: user.$id,
				artworkCollection: artworkCollectionId,
			});

			Alert.alert("Success", "Artwork added successfully");
			router.push("/home");
		} catch (error) {
			console.error("Error creating artwork:", error);
			Alert.alert("Error", "Failed to add artwork. Please try again.");
		} finally {
			setForm({
				title: "",
				year: null,
				price: null,
				edition: null,
				dimensions: "",
				images: null,
			});
			setUploading(false);
		}
	};

	return (
		<>
			<AddArtWorkHeader title="Add Artwork" />
			<SafeAreaView className="bg-background h-full">
				<View className="w-full justify-center items-center min-h-[65vh] flex">
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
									title="Next"
									handlePress={nextStep}
									isLoading={false}
									color="brown"
								/>
							</View>
						</View>
					)}

					{/* Year */}
					{/* Year */}
					{step === 2 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Enter year of work</Text>
							<FormField
								placeholder="Year of Work"
								otherStyles={"w-[85vw]"}
								value={form.year?.toString() || ""}
								handleChangeText={handleYearChange}
								fieldType="number"
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
								value={form.price?.toString() || ""}
								handleChangeText={handlePriceChange}
								fieldType="number"
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
								value={form.edition?.toString() || ""}
								handleChangeText={handleEditionChange}
								keyboardType="number"
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
										className="w-full h-64 rounded-xl"
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
