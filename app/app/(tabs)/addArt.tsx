import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const AddArt = () => {
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
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
					{/* Materials */}
					{step === 3 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Materials Used</Text>
							<FormField
								placeholder="Materials Used"
								otherStyles={"w-[85vw]"}
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
							<Text className="mt-10 text-center font-DMSans">Artwork Dimensions</Text>
							<FormField
								placeholder="Dimensions"
								otherStyles={"w-[85vw]"}
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
					{step === 5 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Enter Price</Text>
							<FormField
								placeholder="Enter Price"
								otherStyles={"w-[85vw]"}
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
					{step === 6 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Edition/More</Text>
							<FormField
								placeholder="Edition"
								otherStyles={"w-[85vw]"}
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
					{step === 7 && (
						<View className="justify-center min-h-[65vh] text-center">
							<Text className="mt-10 text-center font-DMSans">Pictures</Text>

							<View>
								<CustomButton
									title="Back"
									handlePress={prevStep}
									isLoading={false}
								/>
								<CustomButton
									title="Complete"
									handlePress={nextStep}
									isLoading={false}
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
