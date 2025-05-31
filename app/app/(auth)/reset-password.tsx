import React, { useState } from "react";
import { View, Text, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { updatePasswordWithToken } from "@/lib/appwrite";
import { RFValue } from "react-native-responsive-fontsize";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { userId, secret } = useLocalSearchParams();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async () => {
    if (!form.password || !form.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      await updatePasswordWithToken(userId, secret, form.password, form.confirmPassword);
      Alert.alert("Success", "Password reset successfully");
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="w-full justify-center min-h-[85vh] px-4 mt-10">
          <Text className="text-primary text-center font-DMSans" style={{ fontSize: RFValue(24) }}>
            Reset Your Password
          </Text>
          <FormField
            title="New Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter new password"
          />
          <FormField
            title="Confirm New Password"
            value={form.confirmPassword}
            handleChangeText={(e: any) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
            placeholder="Confirm new password"
          />
          <CustomButton
            title="Reset Password"
            handlePress={handleReset}
            isLoading={isSubmitting}
            color="brown"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordPage;
