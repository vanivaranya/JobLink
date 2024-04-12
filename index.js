const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { signIn } = require('./controllers/user'); // Import signIn function
const userRoutes = require('./routes/user');
const logReqRes = require('./middlewares/requestResponseLogger');
const { mongoose, connectMongoDb } = require('./connection');
const axios = require('axios');
const multer = require('multer'); // Import Multer middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer middleware for handling form data
const upload = multer();

app.use(bodyParser.json());

// Enable CORS
app.use(cors());

connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1');

const requestResponseLogger = logReqRes('request_response.log');
app.use(requestResponseLogger);

// Middleware for parsing form data
app.use(upload.none());

// Define API routes
app.post("/api/signin", signIn); // Route for sign-in

// Other routes...
app.use("/api/user", userRoutes);

// Serve static files from the frontend public directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Route to serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// New prediction route with improved error handling
app.post('/predict', async (req, res) => {
  try {
    const user_input = req.body.user_input;

    if (!user_input || user_input.trim() === '') {
      throw new Error('Invalid user input');
    }

    const flaskResponse = await axios.post('http://localhost:5000/predict', { user_input });
    res.json(flaskResponse.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to process prediction request' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

module.exports = app;


// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const userRoutes = require('./routes/user');
// const logReqRes = require('./middlewares/requestResponseLogger'); // Note: Importing the middleware correctly
// const { mongoose, connectMongoDb } = require('./connection');
// const axios = require('axios');
// const multer = require('multer');
// const app = express();
// const PORT = process.env.PORT || 3000;
// // Configure multer middleware for handling form data
// const upload = multer();

// // Middleware for parsing form data
// app.use(upload.none());

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // Connect to MongoDB using the connectMongoDb function
// connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1');

// // Middleware for logging requests and responses
// const requestResponseLogger = logReqRes('request_response.log');
// app.use(requestResponseLogger); // Apply logging middleware

// // Start the server only after MongoDB connection is successful
// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected');
//   app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
//   });
// });

// // Routes
// app.use("/user", userRoutes);

// // Serve the signup page
// app.get("/", (req, res) => {
//   res.render("signup"); // Assuming you have a signup.ejs file in your views directory
// });

// // Set view engine and static files directory
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'views')));

// // New prediction route with improved error handling
// app.post('/predict', async (req, res) => {
//   try {
//     const user_input = req.body.user_input;

//     if (!user_input || user_input.trim() === '') {
//       throw new Error('Invalid user input');
//     }

//     const flaskResponse = await axios.post('http://localhost:5000/predict', { user_input });
//     res.json(flaskResponse.data);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Failed to process prediction request' });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message });
// });

// // Export the app for testing purposes
// module.exports = app;
