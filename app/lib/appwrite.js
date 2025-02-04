import { Client, Account, ID, Databases, Query } from "react-native-appwrite";
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
export const signIn = async (email, password) => {
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
