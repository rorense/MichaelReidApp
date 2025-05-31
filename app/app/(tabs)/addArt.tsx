import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
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
import * as ImageManipulator from "expo-image-manipulator";
import { twMerge } from "tailwind-merge";
import { RFValue } from "react-native-responsive-fontsize";

type AddArtRouteProp = RouteProp<RootStackParamList, "addArt">;

const AddArt = () => {
	const route = useRoute<AddArtRouteProp>();
	const { artworkCollectionId } = route.params || {};
	const [step, setStep] = useState(1);
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState<{
		title: string;
        artist: string;
		year: number | null;
		price: number | null; 
		edition: number | null; 
		dimensions: string;
        medium: string;
		images: { name: string; mimeType: string; fileSize: number; uri: string } | null;
	}>({
		title: "",
        artist: "",
		year: null,
		price: null, 
		edition: null, 
		dimensions: "",
        medium: "",
		images: null,
	});

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

			// Fix the orientation of the image
			const manipulatedImage = await ImageManipulator.manipulateAsync(
				selectedImage.uri,
				[{ rotate: 0 }], // This will fix the orientation
				{ compress: 1, format: ImageManipulator.SaveFormat.JPEG }
			);

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
						return "image/jpeg"; 
				}
			};

			const file = {
				name: selectedImage.fileName || `image_${Date.now()}.jpg`, // Fallback name with timestamp
				mimeType: getMimeType(manipulatedImage.uri), // Use the function to determine MIME type
				fileSize: selectedImage.fileSize || 0,
				uri: manipulatedImage.uri,
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
		if (!form.title || !form.images || !form.artist) {
			return Alert.alert("Error", "Please fill required fields with valid values.");
		}

		setUploading(true);

		try {
			await createArtwork({
				...form,
				userId: user.$id,
				artworkCollection: artworkCollectionId,
			});

			Alert.alert("Success", "Artwork added successfully");
			router.push("/collection");
		} catch (error) {
			console.error("Error creating artwork:", error);
			Alert.alert("Error", "Failed to add artwork. Please try again.");
		} finally {
			setForm({
				title: "",
                artist: "",
				year: null,
				price: null,
				edition: null,
                medium: "",
				dimensions: "",
				images: null,
			});
			setStep(1);
			setUploading(false);
		}
	};

	return (
        <>
            <AddArtWorkHeader title="Add Artwork" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView className="bg-background h-full">
                        <View className="w-full justify-center items-center min-h-[65vh] flex">
                            {/* Title */}
                            {step === 1 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className={twMerge("mt-10 text-center font-DMSans")} style={{ fontSize: RFValue(14) }}>Enter title of work (required)</Text>
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

                            {/* Artist */}
                            {step === 2 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className={twMerge("mt-10 text-center font-DMSans")} style={{ fontSize: RFValue(14) }}>Enter the artist name (required)</Text>
                                    <FormField
                                        placeholder="Name of Artist"
                                        otherStyles={"w-[85vw]"}
                                        value={form.artist}
                                        handleChangeText={(e: any) => setForm({ ...form, artist: e })}
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

                            {/* Year */}
                            {step === 3 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Enter year of work (required)</Text>
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
                            {step === 4 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Artwork Dimensions (optional)</Text>
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
                            {/* Artwork Medium */}
                            {step === 5 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Artwork Medium (optional)</Text>
                                    <FormField
                                        placeholder="Artwork Medium"
                                        otherStyles={"w-[85vw]"}
                                        value={form.medium}
                                        handleChangeText={(e: any) => setForm({ ...form, medium: e })}
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
                            {step === 6 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Enter Price (optional)</Text>
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
                            {step === 7 && (
                                <View className="justify-center min-h-[65vh] text-center">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Edition (optional)</Text>
                                    <FormField
                                        placeholder="Edition"
                                        otherStyles={"w-[85vw]"}
                                        value={form.edition?.toString() || ""}
                                        handleChangeText={handleEditionChange}
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
                            {/* Pictures */}
                            {step === 8 && (
                                <View className="justify-center min-h-[65vh] text-center w-[85vw]">
                                    <Text className="mt-10 text-center font-DMSans" style={{ fontSize: RFValue(14) }}>Picture (required)</Text>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )}
export default AddArt;