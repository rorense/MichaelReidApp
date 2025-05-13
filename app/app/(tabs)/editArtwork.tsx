import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FormField from '../components/FormField';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { editArtwork as updateArtwork } from '@/lib/appwrite';

type ArtworkFields = {
  title: string;
  artist: string;
  year: number | null;
  price: number | null;
  edition: number | null;
  dimensions: string;
  medium: string;
  id: string;
  artworkCollectionId: string;
};

function editArtwork() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, artist, year, edition, dimensions, medium, price, id } = route.params as ArtworkFields;

  const [form, setForm] = useState({
    title,
    artist,
    year,
    edition,
    dimensions,
    medium,
    price,
  });

  const handleEdit = async () => {
    Alert.alert(
      "Confirm Edit",
      "Are you sure you want to save the changes to this artwork?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: async () => {
            // Ensure numeric fields are integers or null
            const updatedForm = {
              ...form,
              year: form.year ? parseInt(form.year.toString(), 10) : null,
              price: form.price ? parseInt(form.price.toString(), 10) : null,
              edition: form.edition ? parseInt(form.edition.toString(), 10) : null,
            };
  
            try {
              await updateArtwork(id, updatedForm);
              Alert.alert("Success", "Artwork updated successfully");
              navigation.goBack();
            } catch (error) {
              console.error("Error updating artwork:", error);
              Alert.alert("Error", "Failed to update artwork. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <Header title="Edit Artwork" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="bg-background h-full">
          <View className="w-full justify-center items-center min-h-[65vh] flex">
            <View className="justify-center text-center my-4">
              <FormField
                title="Title"
                placeholder={form.title}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, title: e })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Artist"
                placeholder={form.artist}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, artist: e })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Year"
                placeholder={form.year?.toString() || ''}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, year: e ? parseInt(e, 10) : null })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Edition"
                placeholder={form.edition?.toString() || ''}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, edition: e ? parseInt(e, 10) : null })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Dimensions"
                placeholder={form.dimensions}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, dimensions: e })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Medium"
                placeholder={form.medium}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, medium: e })}
              />
            </View>
            <View className="justify-center text-center my-4">
              <FormField
                title="Price"
                placeholder={form.price?.toString() || ''}
                otherStyles={"w-[85vw]"}
                handleChangeText={(e: string) => setForm({ ...form, price: e ? parseInt(e, 10) : null })}
              />
            </View>
          </View>
          <View className="w-[70%] mx-auto mb-5">
            <CustomButton handlePress={handleEdit} title="Edit Artwork" isLoading={false} color="brown" />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default editArtwork;