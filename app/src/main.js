import { Client, Users } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  try {
    // Ensure the request method is correct
    if (req.method !== 'DELETE') {
      return res.json({ error: 'Invalid request method' }, 400);
    }

    // Validate if userId is provided
    const userId = req.query.userId;
    if (!userId) {
      return res.json({ error: 'User ID is required' }, 400);
    }

    // Initialize Appwrite Client
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Endpoint
      .setProject(process.env.APPWRITE_PROJECT_ID) // Use environment variables
      .setKey(process.env.APPWRITE_API_KEY); // Use environment variables

    const users = new Users(client);

    // Delete the user
    await users.delete(userId);

    return res.json({ success: true, message: `User ${userId} deleted` }, 200);
  } catch (err) {
    error(err.message);
    return res.json({ error: 'Failed to delete user', details: err.message }, 500);
  }
};
