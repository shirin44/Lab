const express = require('express'); // Import the Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const userRouter = require('./modules/user/userRouter'); // Import user routes
const UserGenerator = require('./modules/user/GeneratorClass'); // Import the UserGenerator class
require('dotenv').config(); // Load environment variables from a .env file

const app = express(); // Initialize the Express application

// Middleware to parse incoming JSON data
app.use(express.json());

// Define a base route for user-related API endpoints
app.use('/api/users', userRouter);

// Function to generate and save users to the database
async function generateAndSaveUsers() {
  const generator = new UserGenerator(); // Create an instance of UserGenerator
  const users = await generator.generateUsers(20, true); // Generate and save 5 users to the database
  console.log('Generated and saved users:', users);
}

// Connect to MongoDB
const PORT = process.env.PORT || 8088;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Generate and save users to the database after successful connection
    await generateAndSaveUsers();

    // Start the server
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} and connected to DB`)
    );
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});
