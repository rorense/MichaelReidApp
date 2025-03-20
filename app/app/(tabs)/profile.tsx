import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { clearSessionOnStart, deleteUser, resetUserPassword } from "@/lib/appwrite";
import { router } from "expo-router";
import FormField from "../components/FormField";
import { RFValue } from "react-native-responsive-fontsize";

const profile = () => {
	const { user } = useGlobalContext();
	const [newPassword, setNewPassword] = useState<{ password: string; oldPassword: string }>({ password: "", oldPassword: "" });

	const onDelete = async () => {
		try {
			await deleteUser(user.$id);
			router.push("/");
			Alert.alert("Success", "User deleted successfully");
			clearSessionOnStart();
		} catch (error) {
			throw new Error("Error deleting user");
		}
	};

	const confirmDelete = () => {
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account? This will delete all related artworks. This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: onDelete,
					style: "destructive",
				},
			],
			{ cancelable: true }
		);
	};

	const resetPassword = async () => {
		try {
			await resetUserPassword(newPassword.oldPassword, newPassword.password);
			Alert.alert("Success", "Password reset successfully");
		} catch (error) {
			Alert.alert("Error", "Error resetting password");
		} finally {
			setNewPassword({ password: "", oldPassword: "" });
		}
	};

	return (
		<>
			<Header />
			<SafeAreaView className="flex-1 bg-background">
				<Text className="text-center font-DMSans" style={{ fontSize: RFValue(32)}}>Profile</Text>
				<View className="flex justify-center items-center mt-5">
					<Text className="font-DMSans" style={{ fontSize: RFValue(18)}}>Username: {user.username}</Text>
					<Text className="font-DMSans" style={{ fontSize: RFValue(18)}}>Email: {user.email}</Text>
					<View className="w-[80vw] mt-20">
						<Text className="font-DMSans text-center my-2" style={{ fontSize: RFValue(20)}}>Reset your password</Text>
						<FormField
							title="Old Password"
							placeholder="Old Password"
							handleChangeText={(e: any) => setNewPassword({ ...newPassword, oldPassword: e })}
						/>
						<FormField
							title="Set New Password"
							placeholder="New Password"
							handleChangeText={(e: any) => setNewPassword({ ...newPassword, password: e })}
							otherStyles={"my-4"}
						/>
						<CustomButton
							handlePress={resetPassword}
							title="Reset Password"
							isLoading={false}
							key={user.$id}
						/>
					</View>
					<View className="mt-10 w-[80vw]">
						<CustomButton
							handlePress={confirmDelete}
							color="brown"
							title="Delete Account"
							key={user.$id}
							isLoading={false}
						/>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default profile;
