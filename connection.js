const mongoose = require("mongoose");

async function connectMongoDb(url) {
  try {
    await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
     // useCreateIndex: true // Corrected option name
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = {
  mongoose,
  connectMongoDb
};
