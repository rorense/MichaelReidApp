import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, BackHandler, ActivityIndicator, Share } from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Adjust the path as necessary
import { router, useLocalSearchParams } from "expo-router";
import ArtWorkHeader from "../components/ArtWorkHeader";
import { deleteArtwork } from "@/lib/appwrite";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

type ArtworkPageRouteProp = RouteProp<RootStackParamList, "artworkpage">;

const ArtworkPage = ({ route }: { route: ArtworkPageRouteProp }) => {
  const { imageUrl, title, artist, dimensions, year, edition, price, $id, artworkCollectionId, medium } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => backHandler.remove();
    }, [artworkCollectionId])
  );

  const deleteArt = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this artwork? This action is irreversible.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteArtwork($id);
              Alert.alert("Success", "Artwork deleted successfully");
              router.push("/collection"); // Navigate back to the home page for that collection
            } catch (error) {
              Alert.alert("Error", "Failed to delete artwork. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Generate PDF with artwork details and share it
  const exportAndSharePDF = async () => {
    try {
      // Sanitize title for filename (remove special characters and spaces)
      const safeTitle = (title && title !== "null" ? String(title).replace(/[^a-z0-9]/gi, "_").toLowerCase() : "artwork");
      const html = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 0; margin: 0; height: 100vh;">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh;">
              ${typeof imageUrl === "string" ? `<img src="${imageUrl}" style="width: 100%; max-width: 400px; display: block; margin: 24px auto;" />` : ""}
              ${title && title !== "null" ? `<h2 style="color: #7D1325; text-align: center;">${title}</h2>` : ""}
              ${artist && artist !== "null" ? `<p style="text-align: center;"><strong>Artist:</strong> ${artist}</p>` : ""}
              ${year && year !== "null" ? `<p style="text-align: center;"><strong>Year:</strong> ${year}</p>` : ""}
              ${edition && edition !== "null" ? `<p style="text-align: center;"><strong>Edition:</strong> ${edition}</p>` : ""}
              ${dimensions && dimensions !== "null" ? `<p style="text-align: center;"><strong>Dimensions:</strong> ${dimensions}</p>` : ""}
              ${medium && medium !== "null" ? `<p style="text-align: center;"><strong>Medium:</strong> ${medium}</p>` : ""}
              ${price && price !== "null" ? `<p style="text-align: center;"><strong>Price:</strong> $${price}</p>` : ""}
              <p style="text-align: center; margin-top: 32px;">
                <a href="https://apps.apple.com/au/app/michael-reid-gallery/id1425945967" style="color: #7D1325; text-decoration: underline;">
                  Create your own Gallery in the Michael Reid Gallery App!
                </a>
              </p>
            </div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html, fileName: safeTitle });
      await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
    } catch (error) {
      Alert.alert("Error", "Failed to export or share PDF. Please try again.");
    }
  };

  return (
    <>
      <ArtWorkHeader  
        title={title} 
        artist={artist} 
        year={year} 
        edition={edition} 
        dimensions={dimensions} 
        medium={medium} 
        price={price}
        id={$id}
        artworkCollectionId={artworkCollectionId}  
      />
      <SafeAreaView className="bg-background pt-10 h-full">
        {loading && (
          <View className="flex justify-center items-center">
            <ActivityIndicator
              size="large"
              color="#7D1325"
            />
          </View>
        )}
        {typeof imageUrl === "string" && (
          <Image
            source={{ uri: imageUrl }}
            className="h-96 mt-2"
            resizeMode="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        )}
        <View className="mt-10 mb-10">
          {title !== "null" && (
            <Text className="font-semibold font-DMSans text-[#7D1325] text-center italic" style={{ fontSize: RFValue(24) }}>
              {title}
            </Text>
          )}
          {artist !== "null" && (
            <Text className="font-semibold font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
              {artist}
            </Text>
          )}
          {year !== "null" && (
            <Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
              {year}
            </Text>
          )}
        </View>
        {edition !== "null" && (
          <Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
            Edition: {edition}
          </Text>
        )}
        {dimensions && dimensions !== "null" && (
          <Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
            Dimensions: {dimensions}
          </Text>
        )}
        {medium && medium !== "null" && (
          <Text className="font-DMSans text-black text-center" style={{ fontSize: RFValue(16) }}>
            Artwork Medium: {medium}
          </Text>
        )}
        {price !== "null" && (
          <View className="mt-5">
            <Text className="font-semibold font-DMSans text-[#7D1325] text-center" style={{ fontSize: RFValue(20) }}>
              ${price}
            </Text>
          </View>
        )}
        <View>
          <TouchableOpacity
            onPress={deleteArt}
            className="mt-5">
            <Text className="font-DMSans text-center text-red-800" style={{ fontSize: RFValue(14)}}>Delete Artwork</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={exportAndSharePDF}
            className="mt-5">
            <Text className="font-DMSans text-center text-blue-800" style={{ fontSize: RFValue(14)}}>Share Artwork</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ArtworkPage;