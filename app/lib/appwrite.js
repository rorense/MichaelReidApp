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
	artworkCollection: "67bd3347002afc98bede",
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

export const getFilePreviewYes = async (fileId) => {
	let fileUrl;

	try {
		console.log("File ID:", fileId);
		console.log("Storage ID:", appwriteConfig.storageId);

		fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, "top", 100);
		console.log("File URL:", fileUrl);

		if (!fileUrl) throw new Error("Failed to get file preview");

		return fileUrl;
	} catch (error) {
		console.error("Error in getFilePreviewYes:", error);
		throw new Error(error);
	}
};

export const uploadFile = async (file) => {
	if (!file) return;
	const asset = { name: file.name, size: file.fileSize, type: file.mimeType, uri: file.uri };

	try {
		const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);
		console.log("Uploaded File:", uploadedFile);

		const fileUrl = await getFilePreviewYes(uploadedFile.$id);
		return fileUrl;
	} catch (error) {
		console.error("Error in upload File:", error);
		throw new Error(error.message || "Error Uploading File");
	}
};

export const createArtwork = async (form) => {
	try {
		const image = await uploadFile(form.images);
		const newArtwork = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, ID.unique(), {
			title: form.title,
			artist: form.artist,
			year: form.year,
			price: form.price,
			edition: form.edition,
			dimensions: form.dimensions,
			medium: form.medium,
			images: image,
			users: form.userId,
			artworkCollection: form.artworkCollection,
		});
		return newArtwork;  
	} catch (error) {
		console.error("Error in createArtwork:", error);
		throw new Error("Failed Creating Artwork Error", error);
	}
};

export const getAllArtworks = async () => {
	try {
		const artworks = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, [Query.orderAsc("title")]);
		return artworks.documents;
	} catch (error) {
		throw new Error(error);
	}
};
export const getAllArtworksByUser = async (artworkCollectionId) => {
	try {
		const artworks = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, [
			Query.equal("artworkCollection", artworkCollectionId),
		]);
		return artworks.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteArtwork = async (artworkId) => {
	try {
		const deleteDocument = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, artworkId);

		return deleteDocument;
	} catch (error) {
		throw new Error(error);
	}
};

export const createArtworkCollection = async (form) => {
	try {
		const newArtworkCollection = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.artworkCollection, ID.unique(), {
			title: form.title,
			users: form.userId,
		});

		return newArtworkCollection;
	} catch (error) {
		throw new Error(error);
	}
};

export const getArtworkCollectionByUser = async (userId) => {
	try {
		const collection = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.artworkCollection, [Query.equal("users", userId)]);
		return collection.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteArtworkCollection = async (collectionId) => {
	try {
		const deleteCollection = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.artworkCollection, collectionId);
		return deleteCollection;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteUser = async (userId, accountId) => {
	try {
		const deleteUser = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, userId);

		return deleteUser;
		
	} catch (error) {
		throw new Error(error);
	}
};

export const editArtwork = async (artworkId, form) => {
	try {
		const updatedArtwork = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, artworkId, {
			title: form.title,
			artist: form.artist,
			year: form.year,
			price: form.price,
			edition: form.edition,
			dimensions: form.dimensions,
			medium: form.medium,
			images: form.images,
		});
		return updatedArtwork;
	} catch (error) {
		throw new Error(error);
	}
}

export const searchArtworks = async (query, userId) => {
	try {
		// Search by title
		const byTitle = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.galleryCollectionId,
			[
				Query.search("title", query),
				Query.equal("users", userId),
			]
		);

		// Search by artist
		const byArtist = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.galleryCollectionId,
			[
				Query.search("artist", query),
				Query.equal("users", userId),
			]
		);

		// Merge and deduplicate results by $id
		const allDocs = [...byTitle.documents, ...byArtist.documents];
		const uniqueDocs = [];
		const seenIds = new Set();
		for (const doc of allDocs) {
			if (!seenIds.has(doc.$id)) {
				uniqueDocs.push(doc);
				seenIds.add(doc.$id);
			}
		}
		return uniqueDocs;
	} catch (error) {
		throw new Error(error);
	}
}

export const sendPasswordResetEmail = async (email) => {
	try {
		// url must be an allowed domain in Appwrite project settings
		const response = await account.createRecovery(email, "https://michaelreid.com.au/reset-password/");
		return response;
	} catch (error) {
		throw new Error(error.message || "Failed to send password reset email");
	}
};