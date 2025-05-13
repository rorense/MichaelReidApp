import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite.js";
import { useGlobalContext } from "@/context/GlobalProvider";
import { RFValue } from "react-native-responsive-fontsize";

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.username === "" || form.password === "" || form.email === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/collection");
      Alert.alert("Success", "Welcome to Michael Reid Gallery!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-primary text-center font-DMSans" style={{ fontSize: RFValue(24) }}>Sign Up to Michael Reid Gallery</Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e: any) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              placeholder="Enter username....."
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder="Enter email....."
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="Enter password....."
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              isLoading={isSubmitting}
              color="brown"
            />
            <View>
              <Text className="text-center font-DMSans mt-4" style={{ fontSize: RFValue(14) }}>Already have an account?</Text>
              <Link href="/sign-in">
                <Text className="text-center font-DMSans mt-5 text-red-950" style={{ fontSize: RFValue(14) }}>Login to your account</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpPage;