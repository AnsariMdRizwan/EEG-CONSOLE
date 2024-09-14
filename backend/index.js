const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const patientRoutes = require('./routes/patientRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODBURL;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to the database');
  } catch (error) {
    console.log('An error occurred:', error);
    process.exit(1);
  }
};

connectDB();

// Use routes
app.use('/patient', patientRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
