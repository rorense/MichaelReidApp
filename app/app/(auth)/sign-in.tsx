import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, Linking, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, SignIn, sendPasswordResetEmail } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { RFValue } from "react-native-responsive-fontsize";

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
      // Use an allowed domain for Appwrite Cloud
      await sendPasswordResetEmail(resetEmail);
      Alert.alert(
        "Success",
        "If your email is registered, you will receive a password reset email with a link to reset your password."
      );
      setShowResetModal(false);
      setResetEmail("");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to send reset email");
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
          setResetEmail("");
        }}
      >
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-white px-8 py-10 rounded-2xl w-[92vw] max-w-xl items-center shadow-lg">
            <Text className="font-DMSans text-center text-2xl mb-4">Reset Password</Text>
            <Text className="font-DMSans text-center mb-4 text-base">
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            <FormField
              title="Email"
              value={resetEmail}
              handleChangeText={setResetEmail}
              otherStyles="w-full mb-6"
              placeholder="Enter your email"
            />
            <CustomButton
              title="Send Reset Email"
              handlePress={handlePasswordResetRequest}
              isLoading={resetLoading}
              color="brown"
            />
            <TouchableOpacity
              onPress={() => {
                setShowResetModal(false);
                setResetEmail("");
              }}
              className="mt-5"
            >
              <Text className="text-center text-red-700 font-DMSans text-base">Cancel</Text>
            </TouchableOpacity>
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
            <Text
              className="text-right text-blue-700 font-DMSans mt-2 mb-2"
              style={{ fontSize: RFValue(14) }}
              onPress={() => setShowResetModal(true)}
            >
              Forgot your password?
            </Text>
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