export default () => ({
  port: parseInt(process.env.PORT) || 8080,
  firebase: {
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_DATABASE_URL,
  },
});
