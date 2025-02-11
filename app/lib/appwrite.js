import { useEffect } from "react";
import { Client, Account, ID, Databases, Query, Storage } from "react-native-appwrite";
// Init your React Native SDK
const client = new Client();

// App Write Configuration
export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.gherkinmedia.michaelreid",
	projectId: "67a037080029ad9aba2a",
	databaseId: "67a039b50007aeb7de6e",
	userCollectionId: "67a03c0200314a0d67be",
	galleryCollectionId: "67a03c45000bebd6e3f0",
	storageId: "67a03dcc00330daaaeb5",
};

// Initialising Appwrite SDKs
client
	.setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
	.setProject(appwriteConfig.projectId) // Your project ID
	.setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Create User action
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, username);
		if (!newAccount) throw Error;

		await SignIn(email, password);

		const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
			accountId: newAccount.$id,
			email: email,
			username: username,
		});
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

// Sign in Validation
export const SignIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
			Query.equal("accountId", currentAccount.$id),
		]);

		if (!currentUser) throw ErrorUtils;

		return currentUser.documents[0];
	} catch (error) {
		throw new Error(error);
	}
};

// Sign Out Action
export const signOut = async () => {
	try {
		await account.deleteSession("current"); // Delete the current session
		return true; // Indicate successful sign-out
	} catch (error) {
		throw new Error(error);
	}
};

// Clear session when app reloads
export const clearSessionOnStart = async () => {
	try {
		await account.deleteSession("current");
		console.log("session cleared");
	} catch (error) {
		console.log("Error clearing session on start", error);
	}
};

export const uploadFile = async (file) => {
	if (!file) return;
	const asset = { name: file.name, type: file.mimeType, size: file.fileSize, uri: file.uri };

	try {
		const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);
		const fileUrl = storage.getFilePreview(appwriteConfig.storageId, uploadedFile.$id, 2000, 2000, "top", 100);

		if (!fileUrl) throw new Error("Failed to get file preview");

		return fileUrl;
	} catch (error) {
		throw new Error(error.message || "Error Uploading File");
	}
};

// Creating and Pushing new Artwork into the database
export const createArtwork = async (form) => {
	try {
		const [image] = await Promise.all([uploadFile(form.images)]);
		const newArtwork = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, ID.unique(), {
			title: form.title,
			year: form.year,
			price: form.price,
			edition: form.edition,
			dimensions: form.dimensions,
			images: image,
		});

		return newArtwork;
	} catch (error) {
		throw new Error(error);
	}
};
