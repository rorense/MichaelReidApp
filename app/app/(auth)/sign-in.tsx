import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, SignIn, sendPasswordResetEmail, updatePasswordWithToken } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { RFValue } from "react-native-responsive-fontsize";
import { Modal, TouchableOpacity } from "react-native";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetCode, setResetCode] = useState("");
  const [resetUserId, setResetUserId] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      await SignIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "Logged in successfully");
      router.replace("/collection");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordResetRequest = async () => {
    if (!resetEmail) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    setResetLoading(true);
    try {
      // Use a safe allowed URL (Appwrite Cloud requires a valid URL, but you won't use it)
      const response = await sendPasswordResetEmail(resetEmail, "https://localhost");
      // Save userId for next step
      setResetUserId(response.userId);
      setResetStep(2);
      Alert.alert("Success", "A reset code has been sent to your email. Please enter it below.");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to send reset email");
    } finally {
      setResetLoading(false);
    }
  };

  const handlePasswordResetConfirm = async () => {
    if (!resetCode || !resetNewPassword || !resetConfirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (resetNewPassword !== resetConfirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setResetLoading(true);
    try {
      await updatePasswordWithToken(resetUserId, resetCode, resetNewPassword, resetConfirmPassword);
      Alert.alert("Success", "Password reset successfully. Please log in.");
      setShowResetModal(false);
      setResetStep(1);
      setResetEmail("");
      setResetCode("");
      setResetUserId("");
      setResetNewPassword("");
      setResetConfirmPassword("");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-background">
      {/* Password Reset Modal */}
      <Modal
        visible={showResetModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowResetModal(false);
          setResetStep(1);
          setResetEmail("");
          setResetCode("");
          setResetUserId("");
          setResetNewPassword("");
          setResetConfirmPassword("");
        }}
      >
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-white px-8 py-10 rounded-2xl w-[92vw] max-w-xl items-center shadow-lg">
            {resetStep === 1 ? (
              <>
                <Text className="font-DMSans text-center text-2xl mb-4">Reset Password</Text>
                <FormField
                  title="Email"
                  value={resetEmail}
                  handleChangeText={setResetEmail}
                  otherStyles="w-full mb-6"
                  placeholder="Enter your email"
                />
                <CustomButton
                  title="Send Reset Code"
                  handlePress={handlePasswordResetRequest}
                  isLoading={resetLoading}
                  color="brown"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowResetModal(false);
                    setResetStep(1);
                    setResetEmail("");
                  }}
                  className="mt-5"
                >
                  <Text className="text-center text-red-700 font-DMSans text-base">Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="font-DMSans text-center text-2xl mb-4">Enter Reset Code & New Password</Text>
                <FormField
                  title="Reset Code"
                  value={resetCode}
                  handleChangeText={setResetCode}
                  otherStyles="w-full mb-4"
                  placeholder="Reset code from email"
                />
                <FormField
                  title="New Password"
                  value={resetNewPassword}
                  handleChangeText={setResetNewPassword}
                  otherStyles="w-full mb-4"
                  placeholder="New password"
                />
                <FormField
                  title="Confirm New Password"
                  value={resetConfirmPassword}
                  handleChangeText={setResetConfirmPassword}
                  otherStyles="w-full mb-6"
                  placeholder="Confirm new password"
                />
                <CustomButton
                  title="Reset Password"
                  handlePress={handlePasswordResetConfirm}
                  isLoading={resetLoading}
                  color="brown"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowResetModal(false);
                    setResetStep(1);
                    setResetEmail("");
                    setResetCode("");
                    setResetUserId("");
                    setResetNewPassword("");
                    setResetConfirmPassword("");
                  }}
                  className="mt-5"
                >
                  <Text className="text-center text-red-700 font-DMSans text-base">Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center min-h-[85vh] px-4 mt-10">
            <Text className=" text-primary text-center font-DMSans" style={{ fontSize: RFValue(24) }}>Log In to Michael Reid Gallery</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder="Enter your email....."
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="Enter your password....."
            />
            {/* Forgot Password Link */}
            <TouchableOpacity onPress={() => setShowResetModal(true)}>
              <Text className="text-right text-blue-700 font-DMSans mt-2 mb-2" style={{ fontSize: RFValue(14) }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
            <CustomButton
              title="Sign In"
              handlePress={submit}
              isLoading={isSubmitting}
              color="brown"
            />
            <View>
              <Text className="text-center font-DMSans mt-4" style={{ fontSize: RFValue(14) }}>Don't have an account?</Text>
              <Link href="/sign-up">
                <Text className="text-center font-DMSans mt-5 text-red-950" style={{ fontSize: RFValue(14) }}>Create an account</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInPage;